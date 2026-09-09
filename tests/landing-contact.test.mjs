// Node 22.16+: node --experimental-strip-types --test tests/landing-contact.test.mjs
// All network calls use injected fakes. No emails or leads are sent.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, QUESTION_GROUPS, validateAnswers, validateContact, qfVerdict, createPayload, sendDiagnostic } from '../src/data/landing-contact.ts';
const answers = Object.fromEntries(QUESTIONS.map(q => [q.id, q.type === 'choice' ? q.opts[0] : 'example.test']));
const contact = { name: ' Test Person ', email: ' test@example.test ', whatsapp: ' +54 9 343 1234567 ', consent: true };

test('all six original answers are present in two groups without duplicates', () => {
  assert.deepEqual(QUESTIONS.map(q => q.id), ['web', 'vende', 'etapa', 'trafico', 'problema', 'presupuesto']);
  assert.deepEqual(QUESTION_GROUPS.flat(), QUESTIONS);
  assert.equal(new Set(QUESTION_GROUPS.flat().map(q => q.id)).size, 6);
});
test('required answers and valid options are enforced', () => {
  assert.equal(Object.keys(validateAnswers({})).length, 6);
  assert.deepEqual(validateAnswers(answers), {});
  assert.ok(validateAnswers({ ...answers, vende: 'fabricated' }).vende);
});
test('step validation only considers that group', () => {
  assert.equal(Object.keys(validateAnswers({}, QUESTION_GROUPS[0])).length, 3);
  assert.equal(Object.keys(validateAnswers({}, QUESTION_GROUPS[1])).length, 3);
});
test('explicit no-current-site response is accepted, not manufactured', () => {
  assert.deepEqual(validateAnswers({ ...answers, web: 'Todavía no tengo' }), {});
  assert.ok(validateAnswers({ ...answers, web: '   ' }).web);
});
test('contact validation preserves name, email, phone and explicit consent', () => {
  assert.deepEqual(validateContact(contact), {});
  assert.deepEqual(Object.keys(validateContact({ name: '', email: 'bad', whatsapp: '123', consent: false })), ['name', 'email', 'whatsapp', 'consent']);
});
test('hot and warm classification remains compatible', () => {
  assert.equal(qfVerdict(answers), 'hot');
  assert.equal(qfVerdict({ ...answers, presupuesto: 'Quiero evaluarlo primero' }), 'warm');
  assert.equal(qfVerdict({ ...answers, etapa: 'Estoy armando mi primera landing' }), 'warm');
});
test('each original cold condition is preserved', () => {
  for (const [key, value] of Object.entries({ vende: 'Todavía estoy validando una idea', etapa: 'Estoy en idea / validación inicial', problema: 'Todavía no tengo claro qué vender', presupuesto: 'No tengo presupuesto ahora' })) {
    assert.equal(qfVerdict({ ...answers, [key]: value }), 'cold');
  }
});
test('payload preserves exact contract, trims fields and does not mutate inputs', () => {
  const original = structuredClone(answers);
  const payload = createPayload(answers, contact);
  assert.deepEqual(Object.keys(payload).sort(), ['name', 'email', 'whatsapp', 'consent', 'verdict', 'answers', 'questions'].sort());
  assert.equal(payload.email, 'test@example.test');
  assert.equal(payload.name, 'Test Person');
  assert.deepEqual(payload.questions.map(q => q.id), Object.keys(payload.answers));
  assert.equal(payload.consent, true);
  assert.deepEqual(answers, original);
});
test('successful submit uses same-origin JSON and passes abort signal', async () => {
  const controller = new AbortController();
  const payload = createPayload(answers, contact);
  let calls = 0;
  await sendDiagnostic(payload, controller.signal, async (url, options) => {
    calls++;
    assert.equal(url, '/api/diagnostico'); assert.equal(options.method, 'POST');
    assert.equal(options.signal, controller.signal);
    assert.deepEqual(JSON.parse(options.body), payload);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  });
  assert.equal(calls, 1);
});
test('server errors are recoverable and do not expose internal configuration', async () => {
  await assert.rejects(sendDiagnostic(createPayload(answers, contact), undefined, async () => new Response(JSON.stringify({ error: 'RESEND_API_KEY missing' }), { status: 500 })), /Tus datos siguen acá/);
});
test('malformed success and JSON responses are rejected', async () => {
  for (const body of ['{}', 'not json']) await assert.rejects(sendDiagnostic(createPayload(answers, contact), undefined, async () => new Response(body, { status: 200 })));
});
test('network failures propagate without erasing saved data', async () => {
  const payload = createPayload(answers, contact);
  await assert.rejects(sendDiagnostic(payload, undefined, async () => { throw new TypeError('offline'); }), /offline/);
  assert.equal(payload.answers.web, answers.web);
});
