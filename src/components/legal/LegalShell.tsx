import Link from "next/link";
import type { ReactNode } from "react";

const links = [
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/cookies", label: "Cookies" },
];

export function LegalShell({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div className="landing-root min-h-dvh">
      <header className="border-b border-line/60">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            aria-label="PUBLIK — inicio"
            className="select-none text-lg font-extrabold tracking-[0.04em] text-ink"
          >
            PUBLI<span className="text-accent">K</span>
          </Link>
          <Link href="/" className="text-sm text-muted transition-colors hover:text-ink">
            ← Volver al sitio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 sm:py-16">
        <h1 className="font-display text-[clamp(2rem,4vw,2.7rem)] font-medium tracking-tight text-balance">
          {title}
        </h1>
        <p className="mt-3 text-sm text-faint">Última actualización: {updated}</p>
        {intro && <p className="mt-6 text-pretty leading-relaxed text-muted">{intro}</p>}

        <div className="legal-prose mt-8 text-[0.98rem] leading-relaxed text-muted">{children}</div>

        <div className="mt-14 rounded-2xl border border-line/70 bg-surface/50 p-5 text-sm text-faint">
          <strong className="text-muted">Aviso:</strong> este documento es una plantilla de
          referencia orientada al marco de Paraguay y de la región. Antes de considerarlo
          definitivo, hacelo revisar por un profesional legal para adecuarlo a tu operación y a
          la normativa vigente en cada jurisdicción donde operes.
        </div>

        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
      </main>
    </div>
  );
}
