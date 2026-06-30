"use client";

import { SmoothScroll } from "./SmoothScroll";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Portals } from "./Portals";
import { Problem } from "./Problem";
import { HowItWorks } from "./HowItWorks";
import { Features } from "./Features";
import { Metrics } from "./Metrics";
import { Pricing } from "./Pricing";
import { Faq } from "./Faq";
import { Cta } from "./Cta";
import { Footer } from "./Footer";
import type { LandingDict } from "./types";

export function LandingShell({ t }: { t: LandingDict }) {
  return (
    <SmoothScroll>
      <div className="landing-root">
        <Nav t={t.nav} />
        <main>
          <Hero t={t.hero} />
          <Portals label={t.hero.publishTo} />
          <Problem t={t.problem} />
          <HowItWorks t={t.how} />
          <Features t={t.features} />
          <Metrics t={t.metrics} />
          <Pricing t={t.pricing} />
          <Faq t={t.faq} />
          <Cta t={t.cta} />
        </main>
        <Footer t={t.footer} />
      </div>
    </SmoothScroll>
  );
}
