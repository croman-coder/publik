"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { IconCheck } from "./Icons";
import { cn } from "./cn";
import type { LandingDict } from "./types";

const ease = [0.16, 1, 0.3, 1] as const;

export function Pricing({ t }: { t: LandingDict["pricing"] }) {
  return (
    <section id="pricing" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading title={t.title} description={t.subtitle} />

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {t.plans.map((p, i) => {
          const highlight = i === 1;
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-8",
                highlight
                  ? "border-accent/50 bg-surface shadow-[0_30px_80px_-30px_rgba(249,115,22,0.45)] lg:-translate-y-3"
                  : "border-line/70 bg-surface/50",
              )}
            >
              {highlight && (
                <>
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-[#1f0d04]">
                    {t.mostPopular}
                  </span>
                  <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-to-b from-accent/20 to-transparent blur-sm" />
                </>
              )}
              <h3 className="text-lg font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.desc}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-medium tracking-tight text-ink">${p.price}</span>
                <span className="text-muted">{t.perMonth}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-accent">{p.posts}</p>
              <ul className="mt-7 space-y-3 text-sm text-muted">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5">
                    <IconCheck className="h-5 w-5 flex-none text-accent" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button
                href="/login"
                variant={highlight ? "primary" : "secondary"}
                size="md"
                className="mt-8 w-full"
              >
                {t.choose} {p.name}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
