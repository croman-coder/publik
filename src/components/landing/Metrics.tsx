"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import type { LandingDict } from "./types";

export function Metrics({ t }: { t: LandingDict["metrics"] }) {
  return (
    <section className="relative overflow-hidden">
      <Image src="/media/aerial.jpg" alt="" aria-hidden fill className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/85 to-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(249,115,22,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
        <Reveal className="text-center">
          <span className="mb-4 inline-flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-7 bg-accent/60" />
            {t.eyebrow}
          </span>
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-medium leading-snug text-balance sm:text-3xl">
            {t.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {t.items.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <div className="font-display text-5xl font-medium tracking-tight text-ink sm:text-6xl">
                {s.value}
              </div>
              <p className="mt-3 text-sm text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="text-xs text-faint">{t.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
