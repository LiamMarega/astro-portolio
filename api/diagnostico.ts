import { Resend } from "resend";

// Plain Vercel Function (Node.js runtime, Web-standard handler). The Astro
// site stays fully static; this file lives at the repo root in `api/` and
// keeps the Resend API key server-side. It is served at POST /api/diagnostico.

// --- Config (set RESEND_API_KEY in the Vercel project env) ---
// swipeloop.app must be a verified domain in Resend for this to send.
const FROM = "LiamDev <contacto@swipeloop.app>";
const TO = "liammarega85@gmail.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VERDICT_LABEL: Record<string, string> = {
  hot: "Buen match (caliente)",
  warm: "Con potencial (templado)",
  cold: "Quizás temprano (frío)",
};

const esc = (s: unknown) =>
  String(s ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

// Replaces Astro's `security.checkOrigin` (lost with the adapter): only the
// production site, Vercel previews and local dev may call this endpoint.
// Origin is preferred; Referer is the fallback. Neither present => rejected.
function isAllowedOrigin(request: Request): boolean {
  const raw = request.headers.get("origin") || request.headers.get("referer");
  if (!raw) return false;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  const { protocol, hostname } = url;
  if (protocol === "https:") {
    return (
      hostname === "www.liammarega.com" ||
      hostname === "liammarega.com" ||
      hostname.endsWith(".vercel.app")
    );
  }
  if (protocol === "http:") {
    return hostname === "localhost" || hostname === "127.0.0.1";
  }
  return false;
}

export async function POST(request: Request): Promise<Response> {
  if (!isAllowedOrigin(request)) {
    return json({ error: "Origen no permitido." }, 403);
  }

  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Cuerpo de la solicitud inválido." }, 400);
  }

  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  const email = typeof payload?.email === "string" ? payload.email.trim() : "";
  const whatsapp = typeof payload?.whatsapp === "string" ? payload.whatsapp.trim() : "";
  const consent = payload?.consent === true;
  const verdict = typeof payload?.verdict === "string" ? payload.verdict : "";
  const answers = (payload?.answers ?? {}) as Record<string, string>;
  const questions = (Array.isArray(payload?.questions) ? payload.questions : []) as {
    id: string;
    q: string;
  }[];

  if (!name || !EMAIL_RE.test(email)) {
    return json({ error: "Nombre o email inválido." }, 400);
  }
  // Need at least 8 digits to be a usable WhatsApp number.
  if ((whatsapp.match(/\d/g) ?? []).length < 8) {
    return json({ error: "WhatsApp inválido." }, 400);
  }
  if (!consent) {
    return json({ error: "Falta aceptar el contacto por WhatsApp." }, 400);
  }

  // WhatsApp click-to-chat link (digits only).
  const waDigits = whatsapp.replace(/\D/g, "");
  const waLink = `https://wa.me/${waDigits}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(
      { error: "El servicio de email no está configurado. Falta RESEND_API_KEY." },
      500,
    );
  }

  const rows = questions
    .map(
      (q) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555;width:45%;vertical-align:top">${esc(
          q.q,
        )}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111">${esc(
          answers[q.id],
        )}</td></tr>`,
    )
    .join("");

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;color:#111">
    <h2 style="margin:0 0 4px">Nuevo diagnóstico — LiamDev</h2>
    <p style="margin:0 0 16px;color:#555">Veredicto: <strong>${esc(
      VERDICT_LABEL[verdict] || verdict || "—",
    )}</strong></p>
    <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #eee;border-radius:8px;overflow:hidden">
      <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555">Nombre</td><td style="padding:8px 12px;border-bottom:1px solid #eee"><strong>${esc(
        name,
      )}</strong></td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee"><a href="mailto:${esc(
        email,
      )}">${esc(email)}</a></td></tr>
      <tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555">WhatsApp</td><td style="padding:8px 12px;border-bottom:1px solid #eee"><a href="${esc(
        waLink,
      )}"><strong>${esc(whatsapp)}</strong></a> — <a href="${esc(
        waLink,
      )}">abrir chat</a></td></tr>
      ${rows}
    </table>
  </div>`;

  const text = [
    `Nuevo diagnóstico — LiamDev`,
    `Veredicto: ${VERDICT_LABEL[verdict] || verdict || "—"}`,
    `Nombre: ${name}`,
    `Email: ${email}`,
    `WhatsApp: ${whatsapp} (${waLink})`,
    ...questions.map((q) => `- ${q.q}\n  ${answers[q.id] || "—"}`),
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Diagnóstico LiamDev — ${name} (${VERDICT_LABEL[verdict] || "—"})`,
      html,
      text,
    });
    if (error) {
      return json({ error: "No se pudo enviar el email. Intentá de nuevo." }, 502);
    }
    return json({ ok: true });
  } catch {
    return json({ error: "Error inesperado al enviar el email." }, 500);
  }
}

// Vercel's documented Web signature for the Node.js runtime (`fetch` default
// export). Routes by method so anything but POST gets a 405.
export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return json({ error: "Método no permitido." }, 405, { Allow: "POST" });
    }
    return POST(request);
  },
};
