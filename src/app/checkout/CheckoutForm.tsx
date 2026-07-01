"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { PlanSlug } from "./plans";

// Número de WhatsApp para coordinar el pago manual (reemplazar por el real).
const WHATSAPP = "595000000000";
const BANCARD_JS =
  "https://vpos.infonet.com.py/checkout/javascript/dist/bancard-checkout-4.0.0.js";

declare global {
  interface Window {
    Bancard?: {
      Checkout: { createForm: (id: string, processId: string, opts?: unknown) => void };
    };
  }
}

function loadBancard(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Bancard) return resolve();
    const s = document.createElement("script");
    s.src = BANCARD_JS;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("No se pudo cargar Bancard"));
    document.body.appendChild(s);
  });
}

export function CheckoutForm({
  plan,
  planName,
  price,
}: {
  plan: PlanSlug;
  planName: string;
  price: number;
}) {
  const [name, setName] = useState("");
  const [agencia, setAgencia] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processId, setProcessId] = useState<string | null>(null);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (!processId) return;
    loadBancard()
      .then(() => window.Bancard?.Checkout.createForm("bancard-container", processId))
      .catch(() => setError("No se pudo iniciar el pago. Probá de nuevo."));
  }, [processId]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email, name, agencia }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError("Revisá tus datos e intentá de nuevo.");
      } else if (data.configured === false) {
        setManual(true);
      } else if (data.process_id) {
        setProcessId(data.process_id);
      }
    } catch {
      setError("Hubo un problema de conexión. Probá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  if (processId) {
    return <div id="bancard-container" className="min-h-[420px] w-full" />;
  }

  if (manual) {
    const msg = encodeURIComponent(
      `Hola, quiero contratar el Plan ${planName} (US$ ${price}/mes) de PUBLIK. Mi email es ${email}.`,
    );
    return (
      <div className="rounded-2xl border border-accent/25 bg-accent/[0.06] p-5 text-sm">
        <p className="text-ink">Estamos terminando de habilitar el pago con tarjeta.</p>
        <p className="mt-2 text-muted">
          Coordiná el pago del <strong className="text-ink">Plan {planName}</strong> por WhatsApp y
          activamos tu cuenta enseguida.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP}?text=${msg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-[#1f0d04] transition-colors hover:bg-accent-2"
        >
          Coordinar por WhatsApp
        </a>
      </div>
    );
  }

  const input =
    "h-11 w-full rounded-xl border border-line/70 bg-bg-2/60 px-3.5 text-sm text-ink placeholder:text-faint focus:border-accent/50 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      <div>
        <label className="mb-1.5 block text-xs text-muted">Nombre completo</label>
        <input className={input} value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-muted">Inmobiliaria / agencia (opcional)</label>
        <input className={input} value={agencia} onChange={(e) => setAgencia(e.target.value)} />
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-muted">Email</label>
        <input
          type="email"
          className={input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs text-muted">WhatsApp</label>
        <input className={input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+595…" />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-accent text-[0.95rem] font-semibold text-[#1f0d04] transition-all hover:bg-accent-2 disabled:opacity-60"
      >
        {loading ? "Procesando…" : `Pagar US$ ${price} con Bancard`}
      </button>
    </form>
  );
}
