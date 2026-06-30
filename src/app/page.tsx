import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import { getServerDictionary } from "../i18n/server";
import { LandingShell } from "../components/landing/LandingShell";
import type { LandingDict } from "../components/landing/types";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/dashboard");

  const { dict } = await getServerDictionary();
  const t: LandingDict = {
    nav: dict.nav,
    hero: dict.hero,
    problem: dict.problem,
    how: dict.how,
    features: dict.features,
    metrics: dict.metrics,
    pricing: dict.pricing,
    faq: dict.faq,
    cta: dict.cta,
    footer: dict.footer,
  };

  return <LandingShell t={t} />;
}
