import { useEffect, useRef, useState } from "react";

type Question =
  | { id: string; type: "text"; q: string; hint?: string; placeholder?: string }
  | { id: string; type: "choice"; q: string; hint?: string; opts: string[] };

const QF_QUESTIONS: Question[] = [
  {
    id: "web",
    type: "text",
    q: "¿Cuál es tu web, landing o perfil actual?",
    hint: "Pegá tu sitio, una landing o tu Instagram — necesito ver dónde estás parado hoy.",
    placeholder: "tudominio.com  ·  instagram.com/tuusuario",
  },
  {
    id: "vende",
    type: "choice",
    q: "¿Qué vendés actualmente?",
    opts: [
      "Servicios / consultoría",
      "Coaching / mentoría",
      "Infoproducto / curso",
      "SaaS / software",
      "Ecommerce",
      "Todavía estoy validando una idea",
    ],
  },
  {
    id: "etapa",
    type: "choice",
    q: "¿En qué etapa está tu negocio?",
    opts: [
      "Ya vendo y quiero mejorar conversión",
      "Ya tengo tráfico pero pocas consultas",
      "Estoy lanzando una nueva oferta",
      "Estoy armando mi primera landing",
      "Estoy en idea / validación inicial",
    ],
  },
  {
    id: "trafico",
    type: "choice",
    q: "¿Estás invirtiendo en tráfico o captación?",
    opts: [
      "Sí, Meta Ads",
      "Sí, Google Ads",
      "Sí, tráfico orgánico constante",
      "Sí, referidos / comunidad / email",
      "No todavía",
    ],
  },
  {
    id: "problema",
    type: "choice",
    q: "¿Cuál es tu principal problema hoy?",
    opts: [
      "Tengo visitas pero pocas consultas",
      "Mi landing no explica bien mi oferta",
      "Mi página se ve poco profesional",
      "Necesito lanzar rápido una oferta",
      "No sé qué está fallando en mi embudo",
      "Todavía no tengo claro qué vender",
    ],
  },
  {
    id: "presupuesto",
    type: "choice",
    q: "Las landings estratégicas arrancan desde USD 600. ¿Tenés presupuesto para invertir si el diagnóstico tiene sentido?",
    opts: [
      "Sí, tengo USD 600–1.000",
      "Sí, tengo USD 1.000+",
      "Quiero evaluarlo primero",
      "No tengo presupuesto ahora",
    ],
  },
];

type Verdict = "hot" | "warm" | "cold";

function qfVerdict(a: Record<string, string>): Verdict {
  const cold =
    a.vende === "Todavía estoy validando una idea" ||
    a.etapa === "Estoy en idea / validación inicial" ||
    a.problema === "Todavía no tengo claro qué vender" ||
    a.presupuesto === "No tengo presupuesto ahora";
  if (cold) return "cold";
  const hotBudget =
    a.presupuesto === "Sí, tengo USD 600–1.000" || a.presupuesto === "Sí, tengo USD 1.000+";
  const goodStage = [
    "Ya vendo y quiero mejorar conversión",
    "Ya tengo tráfico pero pocas consultas",
    "Estoy lanzando una nueva oferta",
  ].includes(a.etapa);
  if (hotBudget && goodStage) return "hot";
  return "warm";
}

const QF_RESULT: Record<Verdict, { k: string; t: string; p: string }> = {
  hot: {
    k: "Sos un buen match",
    t: "Tu proyecto tiene todo para escalar.",
    p: "Por lo que me contás, una landing estratégica puede mover la aguja ya. Dejá tus datos y te respondo en menos de 24h.",
  },
  warm: {
    k: "Hay potencial",
    t: "Puede funcionar muy bien.",
    p: "Tu caso tiene buena base. Veamos juntos si una landing es la mejor inversión ahora o el siguiente paso.",
  },
  cold: {
    k: "Quizás es temprano",
    t: "Primero, claridad de oferta.",
    p: "Todavía conviene validar la oferta antes de invertir en una landing. Igual dejá tus datos y te oriento sin compromiso.",
  },
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

// Self-contained pencil border that sizes to its parent.
function SketchBorder({ pad = 4 }: { pad?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 600, h: 380 });
  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver(() => {
      const r = parent.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);
  const { w, h } = size;
  const r = 10;
  const x0 = pad + 1, y0 = pad + 1, x1 = w - pad - 1, y1 = h - pad - 1;
  const d =
    `M ${x0 + r} ${y0} L ${x1 - r} ${y0} Q ${x1} ${y0} ${x1} ${y0 + r} ` +
    `L ${x1} ${y1 - r} Q ${x1} ${y1} ${x1 - r} ${y1} ` +
    `L ${x0 + r} ${y1} Q ${x0} ${y1} ${x0} ${y1 - r} ` +
    `L ${x0} ${y0 + r} Q ${x0} ${y0} ${x0 + r} ${y0} Z`;
  return (
    <svg ref={ref} className="sketch-border" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true" style={{ filter: "url(#lbPencil)" }}>
      <path d={d} fill="none" stroke="rgba(70,55,28,0.30)" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function QualForm() {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const total = QF_QUESTIONS.length;
  const done = step >= total;
  const q = QF_QUESTIONS[step];

  // Focus the text input only when the user advances steps — never on initial
  // mount, so the island doesn't steal scroll and jump past the hero.
  const inputRef = useRef<HTMLInputElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current && q?.type === "text") inputRef.current?.focus();
    mounted.current = true;
  }, [step, q?.type]);

  const set = (id: string, v: string) => setAns((a) => ({ ...a, [id]: v }));
  const next = () => setStep((s) => Math.min(s + 1, total));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const choose = (id: string, opt: string) => {
    set(id, opt);
    window.setTimeout(() => setStep((s) => s + 1), 240);
  };

  const reset = () => {
    setStep(0);
    setAns({});
    setName("");
    setEmail("");
    setWhatsapp("");
    setConsent(false);
    setStatus("idle");
    setErrorMsg("");
  };

  const verdict = done ? qfVerdict(ans) : "warm";

  const submit = async () => {
    if (!name.trim() || !EMAIL_RE.test(email)) {
      setErrorMsg("Completá tu nombre y un email válido para que pueda responderte.");
      setStatus("error");
      return;
    }
    if ((whatsapp.match(/\d/g) || []).length < 8) {
      setErrorMsg("Dejá tu WhatsApp con código de país para que te escriba.");
      setStatus("error");
      return;
    }
    if (!consent) {
      setErrorMsg("Necesito que aceptes que te escriba por WhatsApp.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp, consent, verdict, answers: ans, questions: QF_QUESTIONS.map((x) => ({ id: x.id, q: x.q })) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "No se pudo enviar la solicitud.");
      }
      setStatus("ok");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Error de conexión. Probá de nuevo.");
      setStatus("error");
    }
  };

  if (status === "ok") {
    const r = QF_RESULT[verdict];
    return (
      <div className="qf card" data-no-pencil>
        <SketchBorder />
        <span className="tape lg" style={{ top: -12, left: "42%", transform: "rotate(-3deg)" }} />
        <div className="qf-verdict">
          <span className="qf-stamp">Solicitud enviada</span>
          <h4 className="qf-q" style={{ marginTop: 14 }}>Gracias, {name.split(" ")[0]}.</h4>
          <p className="qf-hint" style={{ marginTop: 10 }}>
            Recibí tu diagnóstico ({r.k.toLowerCase()}). Te escribo por WhatsApp a <strong>{whatsapp}</strong> en menos de 24h.
          </p>
          <div className="qf-actions">
            <button className="qf-back" onClick={reset}>↺ Empezar de nuevo</button>
          </div>
        </div>
      </div>
    );
  }

  if (done) {
    const r = QF_RESULT[verdict];
    return (
      <div className="qf card" data-no-pencil>
        <SketchBorder />
        <span className="tape lg" style={{ top: -12, left: "42%", transform: "rotate(-3deg)" }} />
        <div className={`qf-verdict v-${verdict}`}>
          <span className="qf-stamp">{r.k}</span>
          <h4 className="qf-q" style={{ marginTop: 14 }}>{r.t}</h4>
          <p className="qf-hint" style={{ marginTop: 10 }}>{r.p}</p>

          <div className="qf-textwrap" style={{ marginTop: 18 }}>
            <input
              className="qf-input"
              type="text"
              value={name}
              placeholder="Tu nombre"
              autoComplete="name"
              aria-label="Tu nombre"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="qf-input"
              type="email"
              value={email}
              placeholder="tu@email.com"
              autoComplete="email"
              aria-label="Tu email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="qf-input"
              type="tel"
              value={whatsapp}
              placeholder="WhatsApp (+54 9 11 ...)"
              autoComplete="tel"
              inputMode="tel"
              aria-label="Tu WhatsApp"
              onChange={(e) => setWhatsapp(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            />
          </div>

          <label className="qf-consent" style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, lineHeight: 1.4, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={consent}
              aria-label="Acepto que me escriban por WhatsApp"
              onChange={(e) => setConsent(e.target.checked)}
              style={{ marginTop: 2, flexShrink: 0 }}
            />
            <span>Acepto que Liam me escriba por WhatsApp para conversar sobre mi proyecto.</span>
          </label>

          {status === "error" && <p className="qf-error" role="alert">{errorMsg}</p>}

          <div className="qf-actions">
            <button className="btn btn-yellow magnet" onClick={submit} disabled={status === "sending"}>
              {status === "sending" ? (
                <>Enviando <span className="qf-spin" aria-hidden="true" /></>
              ) : (
                <>Solicitar diagnóstico <span className="arr"><Arrow /></span></>
              )}
            </button>
            <button className="qf-back" onClick={reset} disabled={status === "sending"}>↺ Empezar de nuevo</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="qf card" data-no-pencil>
      <SketchBorder />
      <span className="tape sm" style={{ top: -11, right: 28, transform: "rotate(7deg)" }} />
      <div className="qf-top">
        <span className="qf-count">
          {String(step + 1).padStart(2, "0")}<i>/</i>{String(total).padStart(2, "0")}
        </span>
        <div className="qf-dots">
          {QF_QUESTIONS.map((_, i) => (
            <span key={i} className={i < step ? "done" : i === step ? "on" : ""} />
          ))}
        </div>
      </div>
      <div className="qf-body" key={step}>
        <h4 className="qf-q">{q.q}</h4>
        {q.hint && <p className="qf-hint">{q.hint}</p>}
        {q.type === "text" ? (
          <div className="qf-textwrap">
            <input
              ref={inputRef}
              className="qf-input"
              type="text"
              value={ans[q.id] || ""}
              placeholder={q.placeholder}
              aria-label={q.q}
              onChange={(e) => set(q.id, e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && (ans[q.id] || "").trim()) next(); }}
            />
            <button className="btn btn-yellow" disabled={!(ans[q.id] || "").trim()} onClick={next}>
              Siguiente <span className="arr"><Arrow /></span>
            </button>
          </div>
        ) : (
          <div className="qf-opts">
            {q.opts.map((o) => (
              <button
                key={o}
                className={"qf-opt" + (ans[q.id] === o ? " sel" : "")}
                onClick={() => choose(q.id, o)}
              >
                <span className="qf-mk" /><span>{o}</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="qf-nav">
        {step > 0 ? (
          <button className="qf-back" onClick={back}>← Atrás</button>
        ) : (
          <span className="qf-tiny">Respondo en menos de 24h</span>
        )}
      </div>
    </div>
  );
}
