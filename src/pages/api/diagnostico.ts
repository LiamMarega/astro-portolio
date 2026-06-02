import type { APIRoute } from "astro";
import { Resend } from "resend";

// On-demand rendered: runs on the server (Vercel function), keeps the
// Resend API key secret. The rest of the site stays static.
export const prerender = false;

// --- Config (placeholders — adjust + set RESEND_API_KEY in your env) ---
const FROM = "LiamDev <onboarding@resend.dev>"; // use a verified domain in production
const TO = "liammaregadevelop@gmail.com";

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

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let payload: any;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Cuerpo de la solicitud inválido." }, 400);
  }

  const name = typeof payload?.name === "string" ? payload.name.trim() : "";
  const email = typeof payload?.email === "string" ? payload.email.trim() : "";
  const verdict = typeof payload?.verdict === "string" ? payload.verdict : "";
  const answers = (payload?.answers ?? {}) as Record<string, string>;
  const questions = (Array.isArray(payload?.questions) ? payload.questions : []) as {
    id: string;
    q: string;
  }[];

  if (!name || !EMAIL_RE.test(email)) {
    return json({ error: "Nombre o email inválido." }, 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
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
      ${rows}
    </table>
  </div>`;

  const text = [
    `Nuevo diagnóstico — LiamDev`,
    `Veredicto: ${VERDICT_LABEL[verdict] || verdict || "—"}`,
    `Nombre: ${name}`,
    `Email: ${email}`,
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
};
