"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { IconChevronDown } from "./Icons";
import { cn } from "./cn";
import type { LandingDict } from "./types";

export function Faq({ t }: { t: LandingDict["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative mx-auto max-w-3xl px-5 py-24 sm:py-28">
      <SectionHeading eyebrow="FAQ" title={t.title} />

      <div className="mt-12 space-y-3">
        {t.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className={cn(
                "rounded-2xl border bg-surface/50 transition-colors",
                isOpen ? "border-accent/30" : "border-line/70",
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-ink"
              >
                {item.q}
                <IconChevronDown
                  className={cn(
                    "h-5 w-5 flex-none text-muted transition-transform duration-300",
                    isOpen && "rotate-180 text-accent",
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-pretty leading-relaxed text-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
