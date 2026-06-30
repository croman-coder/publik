"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "./Button";
import { IconArrowRight, IconPublish, IconCheck } from "./Icons";
import type { LandingDict } from "./types";

const ease = [0.16, 1, 0.3, 1] as const;

const mockRows = [
  { p: "Infocasas", ok: true },
  { p: "Facebook", ok: true },
  { p: "Marketplace", ok: true },
  { p: "Instagram", ok: false },
];

export function Hero({ t }: { t: LandingDict["hero"] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-dvh flex-col justify-center overflow-hidden px-5 pb-20 pt-28"
    >
      {/* Background video */}
      <motion.div style={{ y: mediaY, scale: mediaScale }} className="absolute inset-0 -z-20">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/75 via-bg/55 to-bg" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(249,115,22,0.22),transparent_60%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/4 -z-10 h-[34rem] w-[34rem] rounded-full bg-accent/20 blur-[140px] animate-float-slow" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy */}
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[0.8rem] text-muted backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(249,115,22,0.8)]" />
            {t.badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.05 }}
            className="mt-7 font-display text-[2.6rem] font-medium leading-[1.05] tracking-[-0.02em] text-balance sm:text-6xl lg:text-[4.1rem]"
          >
            {t.titleA}
            <span className="text-accent">{t.titleHighlight}</span>
            {t.titleB}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-muted sm:text-lg lg:mx-0"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
          >
            <Button href="/login" variant="primary" size="lg" className="w-full sm:w-auto">
              <IconPublish className="h-5 w-5" />
              {t.startFree}
            </Button>
            <Button href="#pricing" variant="secondary" size="lg" className="w-full sm:w-auto">
              {t.seePricing}
              <IconArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] text-faint"
          >
            <IconCheck className="h-4 w-4 text-accent" />
            {t.noCard}
          </motion.p>
        </motion.div>

        {/* Product mock card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 8 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          className="relative mx-auto w-full max-w-md lg:mx-0"
        >
          <div className="glass rounded-3xl p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-1.5 pb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </div>
            <div className="rounded-2xl border border-white/8 bg-bg-2/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-ink">{t.mockTitle}</div>
                  <div className="text-sm text-muted">{t.mockSpecs}</div>
                </div>
                <span className="rounded-lg bg-accent px-2.5 py-1 text-xs font-semibold text-[#1f0d04]">
                  {t.mockPublish}
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {mockRows.map((row, i) => (
                  <motion.div
                    key={row.p}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.12, duration: 0.5 }}
                    className="flex items-center justify-between rounded-lg border border-white/8 bg-surface/70 px-3 py-2 text-sm"
                  >
                    <span className="text-muted">{row.p}</span>
                    {row.ok ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {t.statusDone}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-300">
                        <motion.span
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                          className="h-1.5 w-1.5 rounded-full bg-amber-300"
                        />
                        {t.statusInProgress}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/15 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}
