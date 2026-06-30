"use client";

import Image from "next/image";
import { SectionHeading } from "./SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { IconCopy, IconAlert, IconClock } from "./Icons";
import type { LandingDict } from "./types";

const ICONS = [IconCopy, IconAlert, IconClock];

export function Problem({ t }: { t: LandingDict["problem"] }) {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24 sm:py-28">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.subtitle} />

      <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl hairline">
            <Image
              src="/media/facade.jpg"
              alt=""
              aria-hidden
              width={1280}
              height={720}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          </div>
        </Reveal>

        <Stagger className="flex flex-col gap-4">
          {t.items.map((p, i) => {
            const Icon = ICONS[i] ?? IconCopy;
            return (
              <StaggerItem key={p.title}>
                <div className="group flex gap-4 rounded-2xl border border-line/70 bg-surface/50 p-5 transition-colors duration-300 hover:border-white/12 hover:bg-surface">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-accent ring-1 ring-inset ring-white/10">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{p.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
