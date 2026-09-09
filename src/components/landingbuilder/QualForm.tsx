import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { QUESTION_GROUPS, createPayload, sendDiagnostic, validateAnswers, validateContact } from '../../data/landing-contact';
import type { Answers, Contact, Errors } from '../../data/landing-contact';
import '../../styles/landing-contact.css';

const STEPS = ['Tu negocio', 'Tu landing', 'Cómo te contacto'];
const EMPTY_CONTACT: Contact = { name: '', email: '', whatsapp: '', consent: false };

export default function QualForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  const focusErrors = useRef(false);
  const inFlight = useRef(false);
  const requestRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Do not steal focus or scroll on hydration.
    if (mounted.current) headingRef.current?.focus({ preventScroll: true });
    mounted.current = true;
  }, [step, status === 'ok']);
  useEffect(() => () => {
    requestRef.current?.abort();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);
  useEffect(() => {
    // Focus only after validation, never while the user edits another field.
    if (focusErrors.current && Object.keys(errors).length) formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    focusErrors.current = false;
  }, [errors]);

  const clearError = (id: string) => setErrors((previous) => {
    const next = { ...previous }; delete next[id]; return next;
  });
  const back = () => { setErrors({}); setMessage(''); setStatus('idle'); setStep((value) => Math.max(0, value - 1)); };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    if (step < 2) {
      const nextErrors = validateAnswers(answers, QUESTION_GROUPS[step]);
      focusErrors.current = true;
      setErrors(nextErrors);
      if (!Object.keys(nextErrors).length) setStep((value) => Math.min(2, value + 1));
      return;
    }
    // Validate all six original answers, not just the visible contact step.
    const answerErrors = validateAnswers(answers);
    if (Object.keys(answerErrors).length) {
      setStep(QUESTION_GROUPS[0].some((q) => answerErrors[q.id]) ? 0 : 1);
      focusErrors.current = true; setErrors(answerErrors); return;
    }
    const contactErrors = validateContact(contact);
    focusErrors.current = true; setErrors(contactErrors);
    if (Object.keys(contactErrors).length) return;
    inFlight.current = true;
    setStatus('sending'); setMessage('');
    const controller = new AbortController();
    requestRef.current = controller;
    timeoutRef.current = setTimeout(() => controller.abort(), 20000);
    try {
      await sendDiagnostic(createPayload(answers, contact), controller.signal);
      setStatus('ok');
    } catch (error) {
      if (!formRef.current) return;
      setStatus('error');
      setMessage(controller.signal.aborted
        ? 'La conexión tardó demasiado. Tus datos siguen acá; intentá de nuevo.'
        : error instanceof Error ? error.message : 'No se pudo enviar. Intentá de nuevo.');
    } finally {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null; requestRef.current = null; inFlight.current = false;
    }
  }

  if (status === 'ok') return (
    <div className="lc-form lc-success" role="status">
      <span className="lc-eyebrow">Consulta enviada</span>
      <h3 ref={headingRef} tabIndex={-1}>Gracias, {contact.name.trim().split(/\s+/)[0]}.</h3>
      <p>Tu consulta fue enviada. Te respondo por WhatsApp para conversar sobre tu proyecto.</p>
      <a href="#top" className="lc-back">Volver al inicio ↑</a>
    </div>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="lc-form" aria-labelledby="lc-heading" aria-busy={status === 'sending'}>
      <div className="lc-progress" aria-label={`Paso ${step + 1} de 3: ${STEPS[step]}`}>
        {STEPS.map((title, index) => <span key={title} aria-current={step === index ? 'step' : undefined} className={index <= step ? 'is-reached' : ''}><b>{index + 1}</b><span>{title}</span></span>)}
      </div>
      <h3 id="lc-heading" ref={headingRef} tabIndex={-1}>{STEPS[step]}</h3>
      <fieldset disabled={status === 'sending'} className="lc-fields">
        <legend className="lc-sr-only">{STEPS[step]}</legend>
        {step < 2 ? QUESTION_GROUPS[step].map((q) => (
          <div className="lc-field" key={q.id}>
            <label htmlFor={`lc-${q.id}`}>{q.q}</label>
            {q.type === 'text' ? <>
              <input id={`lc-${q.id}`} name={q.id} type="text" autoComplete="url" maxLength={500} value={answers[q.id] || ''} placeholder={q.placeholder} required
                aria-invalid={!!errors[q.id]} aria-describedby={`lc-${q.id}-hint${errors[q.id] ? ` lc-${q.id}-error` : ''}`}
                onChange={(e) => { setAnswers((a) => ({ ...a, [q.id]: e.target.value })); clearError(q.id); }} />
              <small id={`lc-${q.id}-hint`}>{q.hint}</small>
            </> : <select id={`lc-${q.id}`} name={q.id} value={answers[q.id] || ''} required aria-invalid={!!errors[q.id]} aria-describedby={errors[q.id] ? `lc-${q.id}-error` : undefined}
              onChange={(e) => { setAnswers((a) => ({ ...a, [q.id]: e.target.value })); clearError(q.id); }}>
              <option value="" disabled>Elegí una opción</option>
              {q.opts.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>}
            {errors[q.id] && <small id={`lc-${q.id}-error`} className="lc-error">{errors[q.id]}</small>}
          </div>
        )) : <>
          {([
            { id: 'name', label: 'Tu nombre', type: 'text', auto: 'name', placeholder: 'Nombre y apellido' },
            { id: 'email', label: 'Email', type: 'email', auto: 'email', placeholder: 'tu@email.com' },
            { id: 'whatsapp', label: 'WhatsApp con código de país', type: 'tel', auto: 'tel', placeholder: '+54 9 …' },
          ] as const).map((field) => <div className="lc-field" key={field.id}>
            <label htmlFor={`lc-${field.id}`}>{field.label}</label>
            <input id={`lc-${field.id}`} name={field.id} type={field.type} autoComplete={field.auto} maxLength={field.id === 'whatsapp' ? 40 : 254} required
              value={contact[field.id]} placeholder={field.placeholder} aria-invalid={!!errors[field.id]} aria-describedby={errors[field.id] ? `lc-${field.id}-error` : undefined}
              onChange={(e) => { setContact((c) => ({ ...c, [field.id]: e.target.value })); clearError(field.id); }} />
            {errors[field.id] && <small id={`lc-${field.id}-error`} className="lc-error">{errors[field.id]}</small>}
          </div>)}
          <label className="lc-consent" htmlFor="lc-consent">
            <input id="lc-consent" name="consent" type="checkbox" checked={contact.consent} required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'lc-consent-error' : undefined}
              onChange={(e) => { setContact((c) => ({ ...c, consent: e.target.checked })); clearError('consent'); }} />
            <span>Acepto que Liam me escriba por WhatsApp para conversar sobre mi proyecto. <a href="/landing/builder/privacy" target="_blank" rel="noopener noreferrer">Privacidad (abre otra pestaña)</a>.</span>
          </label>
          {errors.consent && <small id="lc-consent-error" className="lc-error">{errors.consent}</small>}
        </>}
      </fieldset>
      {message && <p role="alert" className="lc-error lc-message">{message}</p>}
      <div className="lc-actions">
        {step > 0 && <button type="button" className="lc-back" onClick={back} disabled={status === 'sending'}>← Atrás</button>}
        <button type="submit" className="lc-submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : step === 2 ? 'Enviar consulta' : 'Continuar →'}</button>
      </div>
      <p className="lc-footnote">{step < 2 ? 'Podés volver atrás sin perder tus respuestas.' : 'Reviso tu proyecto personalmente.'}</p>
    </form>
  );
}
