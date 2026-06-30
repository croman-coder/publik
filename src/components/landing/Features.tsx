"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { IconLayers, IconMedia, IconChart } from "./Icons";
import { cn } from "./cn";
import type { LandingDict } from "./types";

const ease = [0.16, 1, 0.3, 1] as const;
const ICONS = [IconLayers, IconMedia, IconChart];

function MiniChart() {
  const bars = [38, 54, 46, 68, 80, 62, 92];
  return (
    <div className="mt-6 flex h-16 items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.06, ease }}
          className="flex-1 rounded-t bg-gradient-to-t from-accent-deep/40 to-accent"
          style={{ minHeight: 4 }}
        />
      ))}
    </div>
  );
}

function Tile({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-line/70 bg-surface/50 p-6 transition-colors duration-300 hover:border-accent/30 sm:p-7",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}

function TileIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-accent ring-1 ring-inset ring-white/10">
      {children}
    </span>
  );
}

export function Features({ t }: { t: LandingDict["features"] }) {
  const items = t.items;
  const I0 = ICONS[0];
  const I1 = ICONS[1];
  const I2 = ICONS[2];

  return (
    <section id="features" className="relative mx-auto max-w-6xl px-5 py-24 sm:py-32">
      <SectionHeading eyebrow={t.title} title={t.subtitle} />

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Tile className="sm:col-span-2 lg:min-h-[22rem]">
          <Image
            src="/media/interior.jpg"
            alt=""
            aria-hidden
            fill
            className="object-cover opacity-[0.16] transition-opacity duration-500 group-hover:opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-surface via-surface/85 to-surface/40" />
          <div className="relative flex h-full flex-col">
            <TileIcon>
              <I0 className="h-6 w-6" />
            </TileIcon>
            <h3 className="font-display text-2xl font-medium tracking-tight text-ink sm:text-3xl">
              {items[0]?.title}
            </h3>
            <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted">{items[0]?.desc}</p>
            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {["Infocasas", "Facebook", "Marketplace", "Instagram", "Clasipar"].map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Tile>

        <Tile delay={0.08}>
          <TileIcon>
            <I1 className="h-6 w-6" />
          </TileIcon>
          <h3 className="text-lg font-semibold text-ink">{items[1]?.title}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{items[1]?.desc}</p>
        </Tile>

        <Tile delay={0.12} className="sm:col-span-2 lg:col-span-3">
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <div>
              <TileIcon>
                <I2 className="h-6 w-6" />
              </TileIcon>
              <h3 className="text-lg font-semibold text-ink">{items[2]?.title}</h3>
              <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-muted">{items[2]?.desc}</p>
            </div>
            <MiniChart />
          </div>
        </Tile>
      </div>
    </section>
  );
}
