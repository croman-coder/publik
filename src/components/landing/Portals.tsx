"use client";

import { Reveal } from "./Reveal";
import { IconPin } from "./Icons";
import { PORTALS } from "./types";
import type { LandingDict } from "./types";

function Row({ reverse = false }: { reverse?: boolean }) {
  const items = [...PORTALS, ...PORTALS, ...PORTALS, ...PORTALS];
  return (
    <div className="marquee-mask flex overflow-hidden">
      <div
        className="flex shrink-0 items-center gap-3.5 pr-3.5 animate-marquee"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-line/70 bg-surface/60 px-5 py-3 text-[0.95rem] font-medium text-ink/90 backdrop-blur-sm"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/12 text-accent">
              <IconPin className="h-3.5 w-3.5" />
            </span>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Portals({ label }: { label: LandingDict["hero"]["publishTo"] }) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-16">
      <Reveal className="mb-8 text-center">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-faint">
          {label}
        </span>
      </Reveal>
      <Reveal className="flex flex-col gap-4" delay={0.1}>
        <Row />
        <Row reverse />
      </Reveal>
    </section>
  );
}
