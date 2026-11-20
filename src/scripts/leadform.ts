import { $, $$, draw, reduceMotion } from './util';
import { scrollToY } from './smooth';
import type { LeadFormText } from '../lib/forms';

/**
 * Multi-step lead forms.
 *  · one step at a time, validated before moving on
 *  · real radios/checkboxes (keyboard + screen readers work as usual)
 *  · draft kept for the session, UTM/referrer attached to every lead
 *  · POSTs JSON to `LEAD_ENDPOINT` (src/content/contact.ts); without it, localhost simulates a send
 *    and a real domain falls back to the visitor's email app with the answers written in
 *
 * Other scripts can fill hidden fields:
 *   document.dispatchEvent(new CustomEvent('lf:set', { detail: { name: 'plan', value: 'Growth' } }))
 * or with markup: <a href="#form" data-lf-set="plan=Growth">
 */

export interface LeadAnswer {
  name: string;
  label: string;
  value: string;
}
export interface LeadPayload {
  source: string;
  lang: string;
  name: string;
  email: string;
  answers: LeadAnswer[];
  meta: {
    page: string;
    url: string;
    referrer: string;
    utm: Record<string, string>;
    submittedAt: string;
    timeZone: string;
    secondsOnForm: number;
  };
  company_site: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URLISH = /^(@[\w.]{2,}|(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?)$/i;
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'ttclid'];

const store = {
  get(k: string) {
    try {
      return JSON.parse(sessionStorage.getItem(k) || 'null');
    } catch {
      return null;
    }
  },
  set(k: string, v: unknown) {
    try {
      sessionStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* private mode / storage full: the form still works */
    }
  },
  drop(k: string) {
    try {
      sessionStorage.removeItem(k);
    } catch {
      /* ignore */
    }
  },
};

/** Remember campaign params from the landing URL for the whole visit. */
function captureUtm() {
  const q = new URLSearchParams(location.search);
  const found: Record<string, string> = {};
  UTM_KEYS.forEach((k) => {
    const v = q.get(k);
    if (v) found[k] = v.slice(0, 200);
  });
  if (Object.keys(found).length) store.set('lf:utm', found);
  return (store.get('lf:utm') as Record<string, string>) ?? {};
}

const fill = (s: string, vars: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_m, k) => vars[k] ?? '');

/** Is there no endpoint yet and we are on the developer's machine? Then fake a send. */
const isLocal = () => import.meta.env.DEV || /^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)$/.test(location.hostname);

function track(source: string) {
  const w = window as any;
  try {
    w.dataLayer?.push({ event: 'generate_lead', form: source });
    w.gtag?.('event', 'generate_lead', { form_id: source });
    w.fbq?.('track', 'Lead', { content_name: source });
    w.ttq?.track?.('SubmitForm');
  } catch {
    /* analytics must never break the form */
  }
}

export function initLeadForms() {
  const utm = captureUtm();
  const forms = $$<HTMLFormElement>('[data-lead-form]');
  forms.forEach((form) => setup(form, utm));

  // markup helpers: <a data-lf-set="plan=Crecimiento">
  document.addEventListener('click', (e) => {
    const el = (e.target as Element).closest<HTMLElement>('[data-lf-set]');
    if (!el) return;
    const raw = el.dataset.lfSet!;
    const i = raw.indexOf('=');
    if (i < 1) return;
    document.dispatchEvent(new CustomEvent('lf:set', { detail: { name: raw.slice(0, i), value: raw.slice(i + 1) } }));
  });
}

function setup(form: HTMLFormElement, utm: Record<string, string>) {
  const root = form.closest<HTMLElement>('[data-lead-form-root]')!;
  const t: LeadFormText = JSON.parse(form.dataset.text!);
  const source = form.dataset.source!;
  const steps = $$<HTMLElement>('[data-lf-step]', form);
  const stepsBox = $('[data-lf-steps]', form)!;
  const count = $('[data-lf-count]', form);
  const bar = $('[data-lf-bar]', form);
  const success = $('[data-lf-success]', root)!;
  const failure = $('[data-lf-error]', root)!;
  const chosen = $('[data-lf-chosen]', form);
  // per language: option values are translated, so an ES draft must not leak into /en/contact
  const draftKey = `lf:draft:${source}:${form.dataset.lang || document.documentElement.lang}`;
  const startedAt = Date.now();
  let current = 0;
  let sending = false;

  /* ── reading answers ── */
  const fieldsOf = (step: HTMLElement) => $$<HTMLElement>('[data-lf-field]', step);
  const controlOf = (field: HTMLElement) => $<HTMLInputElement | HTMLTextAreaElement>('input:not([type=radio]):not([type=checkbox]), textarea', field);
  const labelOf = (field: HTMLElement) =>
    ($('.lf__label', field)?.firstChild?.textContent || $('.lf__label', field)?.textContent || field.dataset.name || '').trim();

  const valueOf = (field: HTMLElement): string => {
    if (field.dataset.kind === 'choice') {
      return $$<HTMLInputElement>('input:checked', field)
        .map((i) => i.value)
        .join(', ');
    }
    return (controlOf(field)?.value ?? '').trim();
  };

  /* ── validation ── */
  const setError = (field: HTMLElement, msg: string) => {
    const err = $('[data-lf-err]', field);
    if (err) err.textContent = msg;
    if (field.dataset.kind === 'choice') {
      if (msg) field.setAttribute('aria-invalid', 'true');
      else field.removeAttribute('aria-invalid');
    } else {
      const c = controlOf(field);
      if (msg) c?.setAttribute('aria-invalid', 'true');
      else c?.removeAttribute('aria-invalid');
    }
  };

  const check = (field: HTMLElement): string => {
    const v = valueOf(field);
    const required = field.hasAttribute('data-required');
    const kind = field.dataset.kind;
    if (!v) return required ? (kind === 'choice' ? t.errors.choose : t.errors.required) : '';
    if (kind === 'email' && !EMAIL.test(v)) return t.errors.email;
    if (kind === 'url' && !URLISH.test(v.replace(/\s/g, ''))) return t.errors.url;
    return '';
  };

  const validateStep = (i: number) => {
    const bad: HTMLElement[] = [];
    for (const f of fieldsOf(steps[i])) {
      const msg = check(f);
      setError(f, msg);
      if (msg) bad.push(f);
    }
    const first = bad[0];
    if (!first) return true;
    const target = first.dataset.kind === 'choice' ? $<HTMLInputElement>('input', first) : controlOf(first);
    target?.focus({ preventScroll: true });
    ensureVisible(first, 120);
    return false;
  };

  // clear an error as soon as the person fixes it
  form.addEventListener('input', (e) => {
    const field = (e.target as Element).closest<HTMLElement>('[data-lf-field]');
    if (field && $('[data-lf-err]', field)?.textContent && !check(field)) setError(field, '');
    queueDraft();
  });
  form.addEventListener('change', (e) => {
    const field = (e.target as Element).closest<HTMLElement>('[data-lf-field]');
    if (field && $('[data-lf-err]', field)?.textContent && !check(field)) setError(field, '');
    saveDraft();
  });
  // validate typed fields when leaving them (only once they have something in)
  form.addEventListener(
    'blur',
    (e) => {
      const el = e.target as HTMLElement;
      if (!el.matches?.('.lf__input')) return;
      const field = el.closest<HTMLElement>('[data-lf-field]')!;
      if ((el as HTMLInputElement).value.trim()) setError(field, check(field));
    },
    true,
  );

  /* ── moving between steps ── */
  const ensureVisible = (el: HTMLElement, margin = 90) => {
    const r = el.getBoundingClientRect();
    if (r.top < margin || r.top > window.innerHeight * 0.7) scrollToY(window.scrollY + r.top - margin, { duration: 0.8 });
  };

  const paintProgress = () => {
    const total = steps.length;
    const label = fill(t.step, { n: String(current + 1), total: String(total) });
    if (count) count.textContent = label;
    if (bar) {
      bar.setAttribute('aria-valuenow', String(current + 1));
      bar.setAttribute('aria-label', label);
      bar.querySelector('i')?.style.setProperty('--p', ((current + 1) / total).toFixed(4));
    }
  };

  const go = (to: number, focus = true) => {
    if (to < 0 || to >= steps.length || to === current) return;
    const back = to < current;
    const from = steps[current];
    const next = steps[to];
    const h0 = stepsBox.offsetHeight;
    from.classList.remove('is-active', 'is-entering', 'is-back');
    next.classList.add('is-active');
    if (!reduceMotion()) {
      next.classList.add('is-entering');
      next.classList.toggle('is-back', back);
      next.addEventListener('animationend', () => next.classList.remove('is-entering', 'is-back'), { once: true });
      const h1 = stepsBox.offsetHeight;
      if (Math.abs(h1 - h0) > 4) {
        stepsBox.animate([{ height: `${h0}px` }, { height: `${h1}px` }], { duration: 420, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
      }
    }
    current = to;
    paintProgress();
    if (focus) {
      $<HTMLElement>('.lf__title', next)?.focus({ preventScroll: true });
      ensureVisible(form);
    }
    saveDraft();
  };

  form.addEventListener('click', (e) => {
    const el = e.target as Element;
    if (el.closest('[data-lf-next]')) {
      if (validateStep(current)) go(current + 1);
    } else if (el.closest('[data-lf-back]')) {
      go(current - 1);
    }
  });

  // one tap on a lone single-choice question moves on (pointer only: arrow keys just select)
  form.addEventListener('click', (e) => {
    const input = (e.target as Element).closest<HTMLInputElement>('input[type=radio]');
    if (!input || (e as MouseEvent).detail === 0) return;
    const field = input.closest<HTMLElement>('[data-lf-field]');
    if (!field?.hasAttribute('data-auto') || current >= steps.length - 1) return;
    window.setTimeout(() => {
      if (input.checked && steps[current].contains(input)) go(current + 1);
    }, 340);
  });

  // Enter moves forward on the first steps instead of submitting the whole form
  form.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.isComposing) return;
    const el = e.target as HTMLElement;
    if (el.tagName === 'TEXTAREA' || el.tagName === 'BUTTON' || el.tagName === 'A') return;
    if (current < steps.length - 1) {
      e.preventDefault();
      if (validateStep(current)) go(current + 1);
    }
  });

  /* ── hidden fields set from the page ── */
  const hiddenInputs = $$<HTMLInputElement>('[data-lf-hidden]', form);
  const paintChosen = () => {
    if (!chosen) return;
    const withChip = hiddenInputs.filter((h) => h.hasAttribute('data-chip') && h.value);
    chosen.hidden = !withChip.length;
    const v = $('[data-lf-chosen-value]', chosen);
    if (v) v.textContent = withChip.map((h) => h.value).join(' · ');
  };
  document.addEventListener('lf:set', (e) => {
    const { name, value } = (e as CustomEvent<{ name: string; value: string }>).detail;
    const input = hiddenInputs.find((h) => h.name === name);
    if (!input) return;
    input.value = value;
    paintChosen();
    saveDraft();
  });
  $('[data-lf-chosen-clear]', form)?.addEventListener('click', () => {
    hiddenInputs.filter((h) => h.hasAttribute('data-chip')).forEach((h) => (h.value = ''));
    paintChosen();
    saveDraft();
  });

  /* ── draft (kept only for this browser tab session) ── */
  const draftControls = $$<HTMLInputElement | HTMLTextAreaElement>('input[name], textarea[name]', form).filter((el) => el.name !== 'company_site');
  let draftTimer = 0;
  function saveDraft() {
    clearTimeout(draftTimer);
    draftTimer = 0;
    const data: Record<string, string | string[]> = {};
    for (let i = 0; i < draftControls.length; i++) {
      const el = draftControls[i];
      if (el instanceof HTMLInputElement && (el.type === 'radio' || el.type === 'checkbox')) {
        if (!el.checked) continue;
        const prev = data[el.name];
        data[el.name] = el.type === 'checkbox' ? [...((prev as string[]) ?? []), el.value] : el.value;
      } else if (el.value) data[el.name] = el.value;
    }
    store.set(draftKey, { data, step: current });
  }
  function queueDraft() {
    clearTimeout(draftTimer);
    draftTimer = window.setTimeout(saveDraft, 150);
  }
  window.addEventListener('pagehide', () => {
    if (draftTimer) saveDraft();
  });
  const restore = () => {
    const draft = store.get(draftKey) as { data: Record<string, string | string[]>; step: number } | null;
    if (!draft?.data) return;
    Object.entries(draft.data).forEach(([name, v]) => {
      $$<HTMLInputElement | HTMLTextAreaElement>(`[name="${CSS.escape(name)}"]`, form).forEach((el) => {
        if (el instanceof HTMLInputElement && (el.type === 'radio' || el.type === 'checkbox')) {
          el.checked = Array.isArray(v) ? v.includes(el.value) : el.value === v;
        } else el.value = String(v);
      });
    });
    paintChosen();
    // come back to the first step that still needs something
    let resume = 0;
    for (let i = 0; i < Math.min(draft.step ?? 0, steps.length - 1); i++) {
      if (fieldsOf(steps[i]).some((f) => check(f))) break;
      resume = i + 1;
    }
    if (resume) {
      steps[0].classList.remove('is-active');
      steps[resume].classList.add('is-active');
      current = resume;
      paintProgress();
    }
  };
  restore();

  /* ── sending ── */
  const collect = (): LeadPayload => {
    const answers: LeadAnswer[] = [];
    hiddenInputs.forEach((h) => {
      if (h.value) answers.push({ name: h.name, label: h.dataset.label || h.name, value: h.value });
    });
    steps.forEach((s) =>
      fieldsOf(s).forEach((f) => {
        const value = valueOf(f);
        if (value) answers.push({ name: f.dataset.name!, label: labelOf(f), value });
      }),
    );
    const get = (n: string) => answers.find((a) => a.name === n)?.value ?? '';
    return {
      source,
      lang: form.dataset.lang || document.documentElement.lang,
      name: get('name'),
      email: get('email'),
      answers,
      meta: {
        page: location.pathname,
        url: location.href.split('#')[0],
        referrer: document.referrer,
        utm,
        submittedAt: new Date().toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        secondsOnForm: Math.round((Date.now() - startedAt) / 1000),
      },
      company_site: ($<HTMLInputElement>('[name=company_site]', form)?.value ?? '').trim(),
    };
  };

  const mailtoFor = (p: LeadPayload) => {
    const lines = p.answers.map((a) => `${a.label}: ${a.value}`);
    let body = `${t.error.intro}\n\n${lines.join('\n')}\n`;
    if (body.length > 1600) body = `${body.slice(0, 1600)}…`;
    const subject = `${t.error.subject}${p.name ? ` · ${p.name}` : ''}`;
    return `mailto:${form.dataset.mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const showPanel = (panel: HTMLElement) => {
    form.hidden = true;
    success.hidden = panel !== success;
    failure.hidden = panel !== failure;
    $$('svg.doodle', panel).forEach((d) => draw(d, true));
    panel.focus({ preventScroll: true });
    ensureVisible(root, 100);
  };

  const send = async (p: LeadPayload): Promise<boolean> => {
    const endpoint = form.dataset.endpoint;
    // bots: pretend it worked and drop it
    if (p.company_site) return true;
    if (!endpoint) {
      if (!isLocal()) return false;
      console.info('[lead form] No endpoint yet (LEAD_ENDPOINT). Simulated send. Payload:', p);
      await new Promise((r) => setTimeout(r, 900));
      return !new URLSearchParams(location.search).has('lf-fail');
    }
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(p),
      });
      if (!res.ok) return false;
      const data = await res.json().catch(() => ({ ok: true }));
      return data?.ok !== false;
    } catch {
      return false;
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    // every step must be valid, not just the last one
    for (let i = 0; i < steps.length; i++) {
      if (!fieldsOf(steps[i]).every((f) => !check(f))) {
        if (i !== current) go(i);
        validateStep(i);
        return;
      }
    }
    const payload = collect();
    sending = true;
    form.classList.add('is-sending');
    form.setAttribute('aria-busy', 'true');
    const ok = await send(payload);
    sending = false;
    form.classList.remove('is-sending');
    form.removeAttribute('aria-busy');

    if (ok) {
      const vars = { name: payload.name.split(' ')[0] || '', email: payload.email };
      const title = $('[data-lf-success-title]', success);
      const body = $('[data-lf-success-body]', success);
      if (title) title.textContent = fill(t.success.title, vars).replace(/,\s*!/, '!').replace(/\s+!/, '!');
      if (body) body.textContent = fill(t.success.body, vars);
      store.drop(draftKey);
      showPanel(success);
      if (!payload.company_site) {
        track(source);
        window.dispatchEvent(new CustomEvent('lead:submitted', { detail: payload }));
      }
    } else {
      const mail = $<HTMLAnchorElement>('[data-lf-mail]', failure);
      if (mail) mail.href = mailtoFor(payload);
      showPanel(failure);
    }
  });

  $('[data-lf-retry]', failure)?.addEventListener('click', () => {
    failure.hidden = true;
    form.hidden = false;
    $<HTMLElement>('[data-lf-submit]', form)?.focus({ preventScroll: true });
  });
}
