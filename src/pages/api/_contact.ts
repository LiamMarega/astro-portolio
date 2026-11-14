/**
 * POST /api/contact: receives both lead forms (/contact and /ecommerce) and emails you through Resend.
 *
 * It is OFF on purpose: the "_" in the file name keeps Astro from building it, because the
 * site is 100 % static today and a server route needs an adapter. To turn it on:
 *   1. npx astro add vercel        (or netlify / node / cloudflare: any server adapter)
 *   2. rename this file to  contact.ts
 *   3. set RESEND_API_KEY, LEADS_TO and LEADS_FROM in your host (see .env.example)
 *   4. in src/content/site.ts set  leadEndpoint: '/api/contact'
 * Nothing else changes: every other page stays static.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

interface Answer {
  name?: string;
  label?: string;
  value?: string;
}
interface Lead {
  source?: string;
  lang?: string;
  name?: string;
  email?: string;
  answers?: Answer[];
  meta?: { page?: string; url?: string; referrer?: string; utm?: Record<string, string>; submittedAt?: string; timeZone?: string };
  company_site?: string;
}

const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY ?? proc.RESEND_API_KEY;
const LEADS_TO = import.meta.env.LEADS_TO ?? proc.LEADS_TO;
const LEADS_FROM = import.meta.env.LEADS_FROM ?? proc.LEADS_FROM;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v: unknown, n: number) => String(v ?? '').slice(0, n).trim();
const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });

// Small per-instance rate limit (5 leads / 10 min / IP). Enough to stop a bot hammering one server.
const hits = new Map<string, number[]>();
const tooMany = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!RESEND_API_KEY || !LEADS_TO || !LEADS_FROM) {
    console.error('[contact] Missing RESEND_API_KEY, LEADS_TO or LEADS_FROM');
    return json({ ok: false, error: 'not_configured' }, 500);
  }

  // JSON from the forms; plain form posts too (browsers without JavaScript)
  const isJson = (request.headers.get('content-type') ?? '').includes('application/json');
  let lead: Lead;
  try {
    if (isJson) lead = await request.json();
    else {
      const fd = await request.formData();
      const answers: Answer[] = [];
      fd.forEach((v, k) => {
        if (k !== 'company_site' && typeof v === 'string' && v) answers.push({ name: k, label: k, value: v });
      });
      lead = { source: 'web', name: String(fd.get('name') ?? ''), email: String(fd.get('email') ?? ''), answers, company_site: String(fd.get('company_site') ?? '') };
    }
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  // the hidden field is only ever filled by bots: say OK and drop it
  if (lead.company_site) return json({ ok: true });

  let ip = 'unknown';
  try {
    ip = clientAddress;
  } catch {
    /* some hosts don't expose it */
  }
  if (tooMany(ip)) return json({ ok: false, error: 'too_many_requests' }, 429);

  const name = clip(lead.name, 120);
  const email = clip(lead.email, 160);
  if (!name || !EMAIL.test(email)) return json({ ok: false, error: 'invalid' }, 422);

  const source = clip(lead.source || 'web', 40);
  const answers = (Array.isArray(lead.answers) ? lead.answers : [])
    .slice(0, 40)
    .map((a) => ({ label: clip(a?.label || a?.name, 140), value: clip(a?.value, 4000) }))
    .filter((a) => a.label && a.value);
  const meta = lead.meta ?? {};
  const utm = Object.entries(meta.utm ?? {})
    .map(([k, v]) => `${k}=${clip(v, 120)}`)
    .join(' · ');
  const extra = [
    ['Página', clip(meta.url || meta.page, 300)],
    ['Llegó desde', clip(meta.referrer, 300)],
    ['Campaña', utm],
    ['Zona horaria', clip(meta.timeZone, 60)],
  ].filter(([, v]) => v);

  const firstAnswer = answers.find((a) => !['Tu nombre', 'Your name', 'Email'].includes(a.label))?.value ?? '';
  const subject = `Nuevo lead (${source}) · ${name}${firstAnswer ? ` · ${firstAnswer.slice(0, 60)}` : ''}`;

  const row = (l: string, v: string, muted = false) =>
    `<tr><td style="padding:10px 14px;border-top:1px solid #eee;color:#777;font-size:13px;vertical-align:top;width:34%">${esc(l)}</td><td style="padding:10px 14px;border-top:1px solid #eee;color:${muted ? '#777' : '#111'};font-size:${muted ? 13 : 15}px;vertical-align:top">${esc(v).replace(/\n/g, '<br>')}</td></tr>`;
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f6f4;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" style="max-width:620px;width:100%;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border-collapse:collapse">
    <tr><td colspan="2" style="padding:22px 14px 14px;background:#ffd60a;font-size:20px;font-weight:600;color:#111">Nuevo lead · ${esc(source)}</td></tr>
    ${answers.map((a) => row(a.label, a.value)).join('')}
    ${extra.map(([l, v]) => row(l, v, true)).join('')}
  </table>
  <p style="max-width:620px;margin:14px auto 0;color:#888;font-size:12px">Responde este email y le llega directo a ${esc(email)}.</p>
</body></html>`;
  const text = [...answers.map((a) => `${a.label}: ${a.value}`), '', ...extra.map(([l, v]) => `${l}: ${v}`)].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: LEADS_FROM,
      to: LEADS_TO.split(',').map((s: string) => s.trim()).filter(Boolean),
      reply_to: email,
      subject,
      html,
      text,
      tags: [{ name: 'source', value: source.replace(/[^\w-]/g, '_') }],
    }),
  }).catch(() => null);

  if (!res?.ok) {
    console.error('[contact] Resend did not accept the email:', res ? `${res.status} ${await res.text().catch(() => '')}` : 'network error');
    return json({ ok: false, error: 'send_failed' }, 502);
  }

  if (!isJson) {
    return new Response('<!doctype html><meta charset="utf-8"><title>¡Gracias!</title><p style="font:18px system-ui;padding:40px">¡Gracias! Ya recibí tu mensaje y te respondo pronto. <a href="/">Volver</a></p>', {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
  return json({ ok: true });
};
