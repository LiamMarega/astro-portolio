import { isAllowedOrigin } from "./_lib/origin.js";

// Plain Vercel Function (Node.js runtime, Web-standard handler), same shape as
// api/diagnostico.ts. It receives the lead form of /contact (and /ecommerce
// later) and emails it through Resend; the API key stays server-side.
// Served at POST /api/contact.

// --- Config (set RESEND_API_KEY in the Vercel project env) ---
// Recipient and sender can be overridden with LEADS_TO / LEADS_FROM; the
// defaults match api/diagnostico.ts. swipeloop.app must be a verified domain
// in Resend for the default sender to work.
const DEFAULT_FROM = "LiamDev <contacto@swipeloop.app>";
const DEFAULT_TO = "liammarega85@gmail.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  meta?: {
    page?: string;
    url?: string;
    referrer?: string;
    utm?: Record<string, string>;
    timeZone?: string;
  };
  company_site?: string;
}

const clip = (v: unknown, n: number) => String(v ?? "").slice(0, n).trim();
const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => {
    const map: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return map[c];
  });

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

// Best-effort rate limit: 5 leads / 10 min / IP, kept in memory of this
// function instance (it resets on cold starts and is not shared between
// instances). Enough to stop a bot hammering one instance; not a hard guarantee.
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();
function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // keep the map from growing forever on a long-lived instance
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_HITS;
}

function clientIp(request: Request): string {
  const h = request.headers;
  const forwarded = h.get("x-vercel-forwarded-for") || h.get("x-forwarded-for") || "";
  return forwarded.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
}

export async function POST(request: Request): Promise<Response> {
  if (!isAllowedOrigin(request)) {
    return json({ ok: false, error: "Origen no permitido." }, 403);
  }

  let lead: Lead;
  try {
    lead = await request.json();
  } catch {
    return json({ ok: false, error: "Cuerpo de la solicitud inválido." }, 400);
  }
  if (!lead || typeof lead !== "object") {
    return json({ ok: false, error: "Cuerpo de la solicitud inválido." }, 400);
  }

  // The honeypot field is only ever filled by bots: answer OK and drop it.
  if (lead.company_site) return json({ ok: true });

  if (tooMany(clientIp(request))) {
    return json({ ok: false, error: "Demasiados envíos. Probá de nuevo en unos minutos." }, 429, {
      "Retry-After": "600",
    });
  }

  const name = clip(lead.name, 120);
  const email = clip(lead.email, 160);
  if (!name || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Nombre o email inválido." }, 422);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ ok: false, error: "El servicio de email no está configurado. Falta RESEND_API_KEY." }, 500);
  }
  const to = (process.env.LEADS_TO || DEFAULT_TO)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const from = process.env.LEADS_FROM || DEFAULT_FROM;

  const source = clip(lead.source || "web", 40);
  const answers = (Array.isArray(lead.answers) ? lead.answers : [])
    .slice(0, 40)
    .map((a) => ({ label: clip(a?.label || a?.name, 140), value: clip(a?.value, 4000) }))
    .filter((a) => a.label && a.value);
  const meta = lead.meta ?? {};
  const utm = Object.entries(meta.utm ?? {})
    .map(([k, v]) => `${k}=${clip(v, 120)}`)
    .join(" · ");
  const extra = [
    ["Idioma", clip(lead.lang, 10)],
    ["Página", clip(meta.url || meta.page, 300)],
    ["Llegó desde", clip(meta.referrer, 300)],
    ["Campaña", utm],
    ["Zona horaria", clip(meta.timeZone, 60)],
  ].filter(([, v]) => v);

  const firstAnswer = answers.find((a) => !["Tu nombre", "Your name", "Email"].includes(a.label))?.value ?? "";
  const subject = `Nuevo lead (${source}) · ${name}${firstAnswer ? ` · ${firstAnswer.slice(0, 60)}` : ""}`.replace(/[\r\n]+/g, " ");

  const row = (l: string, v: string, muted = false) =>
    `<tr><td style="padding:10px 14px;border-top:1px solid #eee;color:#777;font-size:13px;vertical-align:top;width:34%">${esc(l)}</td><td style="padding:10px 14px;border-top:1px solid #eee;color:${muted ? "#777" : "#111"};font-size:${muted ? 13 : 15}px;vertical-align:top">${esc(v).replace(/\n/g, "<br>")}</td></tr>`;
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f6f4;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <table role="presentation" style="max-width:620px;width:100%;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border-collapse:collapse">
    <tr><td colspan="2" style="padding:22px 14px 14px;background:#ffd60a;font-size:20px;font-weight:600;color:#111">Nuevo lead · ${esc(source)}</td></tr>
    ${answers.map((a) => row(a.label, a.value)).join("")}
    ${extra.map(([l, v]) => row(l, v, true)).join("")}
  </table>
  <p style="max-width:620px;margin:14px auto 0;color:#888;font-size:12px">Respondé este email y le llega directo a ${esc(email)}.</p>
</body></html>`;
  const text = [
    ...answers.map((a) => `${a.label}: ${a.value}`),
    "",
    ...extra.map(([l, v]) => `${l}: ${v}`),
  ].join("\n");

  let res: Response | null = null;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject,
        html,
        text,
        tags: [{ name: "source", value: source.replace(/[^\w-]/g, "_") }],
      }),
    });
  } catch {
    res = null;
  }

  if (!res?.ok) {
    // never log the key or the lead; the status is enough to debug
    console.error("[contact] Resend did not accept the email:", res ? res.status : "network error");
    return json({ ok: false, error: "No se pudo enviar el email. Intentá de nuevo." }, 502);
  }
  return json({ ok: true });
}

// Vercel's documented Web signature for the Node.js runtime (`fetch` default
// export). Routes by method so anything but POST gets a 405.
export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return json({ ok: false, error: "Método no permitido." }, 405, { Allow: "POST" });
    }
    return POST(request);
  },
};
