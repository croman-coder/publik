"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { IconPublish, IconPin, IconSync } from "./Icons";
import { cn } from "./cn";
import type { LandingDict } from "./types";

const ease = [0.16, 1, 0.3, 1] as const;
const ICONS = [IconPublish, IconPin, IconSync];

export function HowItWorks({ t }: { t: LandingDict["how"] }) {
  const [active, setActive] = useState(0);
  const steps = t.steps;

  return (
    <section id="how" className="relative border-y border-line/60 bg-bg-2">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
        <SectionHeading eyebrow={t.title} title={t.subtitle} />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Sticky visual */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl hairline">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/media/interior.jpg"
                >
                  <source src="/media/interior.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-bg/10" />
                <div className="absolute inset-x-5 bottom-5">
                  <div className="rounded-2xl glass p-5">
                    <div className="text-[0.72rem] uppercase tracking-[0.2em] text-accent">
                      {steps[active].n}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.4, ease }}
                        className="mt-2"
                      >
                        <h3 className="font-display text-2xl text-ink">{steps[active].title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{steps[active].desc}</p>
                      </motion.div>
                    </AnimatePresence>
                    <div className="mt-4 flex gap-1.5">
                      {steps.map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1 rounded-full transition-all duration-500",
                            i === active ? "w-8 bg-accent" : "w-4 bg-white/15",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="flex flex-col">
            {steps.map((s, i) => {
              const Icon = ICONS[i] ?? IconPublish;
              return (
                <motion.div
                  key={s.n}
                  onViewportEnter={() => setActive(i)}
                  viewport={{ margin: "-45% 0px -45% 0px" }}
                  className="flex gap-5 border-t border-line/60 py-9 first:border-t-0 lg:min-h-[58vh] lg:flex-col lg:justify-center lg:py-0"
                >
                  <span
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-500",
                      i === active
                        ? "bg-accent text-[#1f0d04] shadow-[0_8px_30px_-8px_rgba(249,115,22,0.7)]"
                        : "bg-surface text-muted ring-1 ring-inset ring-white/10",
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="lg:mt-5">
                    <span className="font-display text-sm text-faint">{s.n}</span>
                    <h3
                      className={cn(
                        "mt-1 font-display text-2xl font-medium tracking-tight transition-colors duration-500 sm:text-3xl",
                        i === active ? "text-ink" : "text-muted",
                      )}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted">{s.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
