/** Keep option values and payload keys compatible with /api/diagnostico. */
export type Question =
  | { id: string; type: 'text'; q: string; placeholder: string; hint: string }
  | { id: string; type: 'choice'; q: string; opts: string[] };

export const QUESTIONS: Question[] = [
  { id: 'web', type: 'text', q: '¿Cuál es tu web o perfil actual?', placeholder: 'Tu sitio o tu perfil de Instagram', hint: 'Si todavía no tenés, escribí “Todavía no tengo”.' },
  { id: 'vende', type: 'choice', q: '¿Qué vendés?', opts: ['Servicios / consultoría', 'Coaching / mentoría', 'Infoproducto / curso', 'SaaS / software', 'Ecommerce', 'Todavía estoy validando una idea'] },
  { id: 'etapa', type: 'choice', q: '¿En qué etapa estás?', opts: ['Ya vendo y quiero mejorar conversión', 'Ya tengo tráfico pero pocas consultas', 'Estoy lanzando una nueva oferta', 'Estoy armando mi primera landing', 'Estoy en idea / validación inicial'] },
  { id: 'trafico', type: 'choice', q: '¿Cómo llegan hoy tus clientes?', opts: ['Sí, Meta Ads', 'Sí, Google Ads', 'Sí, tráfico orgánico constante', 'Sí, referidos / comunidad / email', 'No todavía'] },
  { id: 'problema', type: 'choice', q: '¿Qué necesitás mejorar?', opts: ['Tengo visitas pero pocas consultas', 'Mi landing no explica bien mi oferta', 'Mi página se ve poco profesional', 'Necesito lanzar rápido una oferta', 'No sé qué está fallando en mi embudo', 'Todavía no tengo claro qué vender'] },
  { id: 'presupuesto', type: 'choice', q: '¿Qué presupuesto estás evaluando?', opts: ['Sí, tengo USD 600–1.000', 'Sí, tengo USD 1.000+', 'Quiero evaluarlo primero', 'No tengo presupuesto ahora'] },
];

export const QUESTION_GROUPS = [QUESTIONS.slice(0, 3), QUESTIONS.slice(3)];
export type Answers = Record<string, string>;
export type Verdict = 'hot' | 'warm' | 'cold';
export interface Contact { name: string; email: string; whatsapp: string; consent: boolean }
export type Errors = Record<string, string>;

export function qfVerdict(a: Answers): Verdict {
  if (a.vende === 'Todavía estoy validando una idea' || a.etapa === 'Estoy en idea / validación inicial' || a.problema === 'Todavía no tengo claro qué vender' || a.presupuesto === 'No tengo presupuesto ahora') return 'cold';
  const budget = a.presupuesto === 'Sí, tengo USD 600–1.000' || a.presupuesto === 'Sí, tengo USD 1.000+';
  const stage = ['Ya vendo y quiero mejorar conversión', 'Ya tengo tráfico pero pocas consultas', 'Estoy lanzando una nueva oferta'].includes(a.etapa);
  return budget && stage ? 'hot' : 'warm';
}

export function validateAnswers(answers: Answers, questions: Question[] = QUESTIONS): Errors {
  const errors: Errors = {};
  for (const q of questions) {
    const answer = (answers[q.id] || '').trim();
    if (!answer || (q.type === 'choice' && !q.opts.includes(answer))) errors[q.id] = 'Completá esta respuesta para continuar.';
  }
  return errors;
}

export function validateContact(contact: Contact): Errors {
  const errors: Errors = {};
  if (!contact.name.trim()) errors.name = 'Completá tu nombre.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) errors.email = 'Ingresá un email válido.';
  if ((contact.whatsapp.match(/\d/g) || []).length < 8) errors.whatsapp = 'Ingresá tu WhatsApp con código de país.';
  if (!contact.consent) errors.consent = 'Aceptá el contacto por WhatsApp para enviar tu consulta.';
  return errors;
}

export function createPayload(answers: Answers, contact: Contact) {
  const cleanAnswers = Object.fromEntries(QUESTIONS.map(({ id }) => [id, (answers[id] || '').trim()]));
  return {
    name: contact.name.trim(), email: contact.email.trim(), whatsapp: contact.whatsapp.trim(), consent: contact.consent,
    verdict: qfVerdict(cleanAnswers), answers: cleanAnswers, questions: QUESTIONS.map(({ id, q }) => ({ id, q })),
  };
}

/** Injectable fetch keeps tests completely separate from real lead delivery. */
export async function sendDiagnostic(payload: ReturnType<typeof createPayload>, signal?: AbortSignal, fetcher: typeof fetch = fetch) {
  const response = await fetcher('/api/diagnostico', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal,
  });
  const body = await response.json().catch(() => null);
  if (!response.ok || body?.ok !== true) {
    throw new Error('No se pudo enviar tu consulta. Tus datos siguen acá; podés intentarlo de nuevo.');
  }
}
