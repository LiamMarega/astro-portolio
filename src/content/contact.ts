/**
 * ─────────────────────────────────────────────────────────────────────
 *  /contact (es) and /en/contact: all the copy of the lead form lives here.
 *  The form engine is src/components/LeadForm.astro + src/scripts/leadform.ts;
 *  the endpoint is the root Vercel Function api/contact.ts.
 *
 *  Every text is written for both languages through `L('español', 'english')`.
 *  The public email comes from `site.email` (src/content/site.ts), never hardcoded.
 * ─────────────────────────────────────────────────────────────────────
 */
import type { LeadFormConfig } from '../lib/forms';
import { useContent, type Locale } from './site';

/** Where every lead form POSTs its JSON (a Vercel Function, see api/contact.ts). */
export const LEAD_ENDPOINT = '/api/contact/';

/** The two URLs of the contact page, used by the nav language switch and the hreflang tags. */
export const contactPath: Record<Locale, string> = { es: '/contact/', en: '/en/contact/' };

const cache = new Map<Locale, ReturnType<typeof build>>();

function build(lang: Locale) {
  const L = (es: string, en: string) => (lang === 'es' ? es : en);
  const { site } = useContent(lang);

  const form: LeadFormConfig = {
    source: 'contact',
    lang,
    steps: [
      {
        title: L('¿Qué necesitás?', 'What do you need?'),
        fields: [
          {
            kind: 'choice',
            name: 'need',
            label: L('Qué necesita', 'What they need'),
            required: true,
            options: [
              { label: L('Una tienda online (e-commerce headless)', 'An online store (headless e-commerce)'), icon: 'Store' },
              { label: L('Una landing page que venda', 'A landing page that sells'), icon: 'Rocket' },
              { label: L('Una app mobile con Flutter', 'A mobile app with Flutter'), icon: 'Smartphone' },
              { label: L('Un SaaS o producto web a medida', 'A SaaS or custom web product'), icon: 'Boxes' },
              { label: L('Otra cosa', 'Something else'), icon: 'MessageCircle' },
            ],
          },
        ],
      },
      {
        title: L('Contame del proyecto', 'Tell me about the project'),
        hint: L('Con un par de líneas alcanza. Si ya tenés sitio o app, pasame el link.', 'A couple of lines is enough. If you already have a site or app, share the link.'),
        fields: [
          {
            kind: 'textarea',
            name: 'project',
            label: L('¿De qué se trata?', 'What is it about?'),
            placeholder: L('Qué querés lograr, para quién es y qué tenés hoy.', 'What you want to achieve, who it is for and what you have today.'),
            required: true,
            rows: 5,
            maxlength: 1500,
          },
          {
            kind: 'url',
            name: 'link',
            label: L('Sitio, app o red social actual', 'Current site, app or social profile'),
            placeholder: L('tusitio.com o @usuario', 'yoursite.com or @handle'),
            maxlength: 200,
          },
          {
            kind: 'choice',
            name: 'timing',
            label: L('¿Para cuándo lo necesitás?', 'When do you need it?'),
            look: 'chips',
            options: [
              { label: L('Lo antes posible', 'As soon as possible') },
              { label: L('En 1 a 3 meses', 'In 1 to 3 months') },
              { label: L('Sin apuro, estoy explorando', 'No rush, just exploring') },
            ],
          },
        ],
      },
      {
        title: L('¿Cómo te contacto?', 'How can I reach you?'),
        fields: [
          {
            kind: 'text',
            name: 'name',
            label: L('Tu nombre', 'Your name'),
            placeholder: L('Nombre y apellido', 'First and last name'),
            autocomplete: 'name',
            required: true,
            half: true,
            maxlength: 120,
          },
          {
            kind: 'email',
            name: 'email',
            label: 'Email',
            placeholder: L('vos@correo.com', 'you@email.com'),
            autocomplete: 'email',
            required: true,
            half: true,
            maxlength: 160,
          },
          {
            kind: 'tel',
            name: 'phone',
            label: L('WhatsApp o teléfono', 'WhatsApp or phone'),
            placeholder: L('Con código de país', 'With country code'),
            autocomplete: 'tel',
            maxlength: 40,
          },
        ],
      },
    ],
    text: {
      step: L('Paso {n} de {total}', 'Step {n} of {total}'),
      next: L('Siguiente', 'Next'),
      back: L('Atrás', 'Back'),
      submit: L('Enviar mensaje', 'Send message'),
      sending: L('Enviando…', 'Sending…'),
      optional: L('opcional', 'optional'),
      errors: {
        required: L('Completá este campo para seguir.', 'Please fill in this field to continue.'),
        choose: L('Elegí una opción para seguir.', 'Pick an option to continue.'),
        email: L('Revisá el email: parece que falta algo.', 'Check the email: something looks off.'),
        url: L('Pasame un link o un @usuario válido.', 'Enter a valid link or @handle.'),
      },
      privacy: L('Uso tus datos solo para responderte sobre este proyecto.', 'I only use your details to reply about this project.'),
      success: {
        title: L('¡Gracias, {name}!', 'Thank you, {name}!'),
        body: L(
          'Ya recibí tu mensaje. Lo leo yo mismo y te respondo por email a {email}.',
          'I got your message. I read every one myself and will reply by email at {email}.',
        ),
      },
      error: {
        title: L('No pude enviarlo desde acá', 'I couldn’t send it from here'),
        body: L(
          'Probá de nuevo en un rato, o mandámelo por email: te dejo tus respuestas escritas.',
          'Try again in a moment, or send it by email: I’ll prefill your answers for you.',
        ),
        mail: L('Enviar por email', 'Send by email'),
        retry: L('Volver a intentar', 'Try again'),
        subject: L('Nuevo proyecto desde liammarega.com', 'New project from liammarega.com'),
        intro: L('¡Hola Liam! Estas son mis respuestas del formulario:', 'Hi Liam! Here are my answers from the contact form:'),
      },
    },
  };

  return {
    lang,
    title: L('Contacto: contame tu proyecto web o app | Liam Marega', 'Contact: tell me about your project | Liam Marega'),
    description: L(
      'Contame qué necesitás: una tienda online, una landing, una app mobile o un SaaS. Formulario en tres pasos; lo leo yo mismo y te respondo por email.',
      'Tell me what you need: an online store, a landing page, a mobile app or a SaaS. Three quick steps; I read every message myself and reply by email.',
    ),
    note: L('tres pasos rápidos =)', 'three quick steps =)'),
    heading: [L('Hablemos de tu', 'Let’s talk about your'), L('próximo proyecto', 'next project')],
    intro: L(
      'Unas pocas preguntas para responderte con algo útil y no con un mensaje genérico. Leo cada mensaje personalmente.',
      'A few questions so I can come back with something useful instead of a generic reply. I read every message personally.',
    ),
    nextTitle: L('Qué pasa después', 'What happens next'),
    next: [
      L('Leo tus respuestas y miro lo que ya tenés.', 'I read your answers and look at what you have today.'),
      L('Te escribo por email para ver si encajo y coordinar una charla.', 'I email you to see if I’m a good fit and set up a chat.'),
      L('Si avanzamos, te paso una propuesta con alcance, plazos y precio.', 'If we go ahead, I send a proposal with scope, timeline and price.'),
    ],
    direct: L('¿Preferís escribir directo?', 'Rather write an email?'),
    form,
    /** nav of this page: home sections + this page as the active "Chat" item */
    nav: {
      items: [
        { key: 'hey', label: site.nav[0].label, href: lang === 'es' ? '/' : '/en/' },
        { key: 'work', label: site.nav[1].label, href: `${lang === 'es' ? '/' : '/en/'}#work` },
        { key: 'story', label: site.nav[2].label, href: `${lang === 'es' ? '/' : '/en/'}#story` },
        { key: 'chat', label: site.nav[3].label, href: contactPath[lang] },
      ],
      active: 'chat',
    },
  };
}

/** Everything /contact needs, in one language. */
export function useContact(locale?: string) {
  const l: Locale = locale === 'en' ? 'en' : 'es';
  let c = cache.get(l);
  if (!c) {
    c = build(l);
    cache.set(l, c);
  }
  return c;
}
