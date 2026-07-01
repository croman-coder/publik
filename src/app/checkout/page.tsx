import type { Metadata } from "next";
import Link from "next/link";
import { PLANS, isPlanSlug, type PlanSlug } from "./plans";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Contratar plan",
  robots: { index: false, follow: false },
};

const FEATURES: Record<PlanSlug, string[]> = {
  inicial: ["Todos los portales", "Fotos sincronizadas", "Estado en vivo"],
  profesional: ["Todo lo de Inicial", "Más publicaciones", "Soporte prioritario"],
  agencia: ["Todo lo de Profesional", "Sin límite de publicaciones", "Varios agentes"],
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const sp = await searchParams;
  const slug: PlanSlug = isPlanSlug(sp.plan) ? sp.plan : "profesional";
  const plan = PLANS[slug];

  return (
    <div className="landing-root min-h-dvh">
      <header className="border-b border-line/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link href="/" className="select-none text-lg font-extrabold tracking-[0.04em] text-ink">
            PUBLI<span className="text-accent">K</span>
          </Link>
          <Link href="/#precios" className="text-sm text-muted transition-colors hover:text-ink">
            ← Ver planes
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-10 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        {/* Resumen */}
        <div>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">
            Estás contratando
          </span>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,2.6rem)] font-medium tracking-tight">
            Plan {plan.name}
          </h1>
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="font-display text-5xl font-medium text-ink">${plan.price}</span>
            <span className="text-muted">/ mes</span>
          </div>
          <p className="mt-2 text-sm font-medium text-accent">{plan.posts}</p>

          <ul className="mt-7 space-y-3 text-sm text-muted">
            {FEATURES[slug].map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                    <path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-2">
            {(Object.keys(PLANS) as PlanSlug[]).map((s) => (
              <Link
                key={s}
                href={`/checkout?plan=${s}`}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  s === slug
                    ? "border-accent/40 bg-accent/10 text-ink"
                    : "border-line/70 text-muted hover:text-ink"
                }`}
              >
                {PLANS[s].name} · ${PLANS[s].price}
              </Link>
            ))}
          </div>
        </div>

        {/* Formulario de pago */}
        <div className="rounded-3xl border border-line/70 bg-surface/50 p-6 sm:p-8">
          <h2 className="font-display text-xl font-medium text-ink">Creá tu cuenta</h2>
          <p className="mt-1.5 text-sm text-muted">
            Primero abonás el plan; con el pago confirmado activamos tu cuenta.
          </p>
          <div className="mt-6">
            <CheckoutForm plan={slug} planName={plan.name} price={plan.price} />
          </div>
          <p className="mt-5 flex items-center gap-1.5 text-xs text-faint">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/15 text-accent">
              <svg viewBox="0 0 20 20" fill="none" className="h-2.5 w-2.5">
                <path d="M10 2 4 4v5c0 3.5 2.5 6 6 7 3.5-1 6-3.5 6-7V4l-6-2Z" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
            Pago procesado por Bancard. Encriptado y con norma PCI DSS.
          </p>
        </div>
      </main>
    </div>
  );
}
