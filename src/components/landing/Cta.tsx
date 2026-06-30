"use client";

import { ParallaxImage } from "./ParallaxImage";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { IconArrowRight } from "./Icons";
import type { LandingDict } from "./types";

const ease = [0.16, 1, 0.3, 1] as const;

export function Cta({ t }: { t: LandingDict["cta"] }) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        className="relative overflow-hidden rounded-[2rem] hairline"
      >
        <ParallaxImage src="/media/keys.jpg" className="opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg/90 to-accent-deep/30" />
        <div className="absolute -bottom-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]" />

        <div className="relative flex flex-col items-center px-6 py-16 text-center sm:px-12 sm:py-24">
          <h2 className="max-w-2xl font-display text-3xl font-medium leading-[1.1] tracking-[-0.01em] text-balance sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-6 max-w-lg text-pretty leading-relaxed text-muted sm:text-lg">{t.subtitle}</p>
          <Button href="/login" variant="primary" size="lg" className="mt-9">
            {t.button}
            <IconArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
