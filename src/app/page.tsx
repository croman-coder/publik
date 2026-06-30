import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import { getServerDictionary } from "../i18n/server";
import { LandingShell } from "../components/landing/LandingShell";
import { JsonLd } from "../components/landing/JsonLd";
import type { LandingDict } from "../components/landing/types";

export default async function Home() {
  // El landing es público: si Supabase no está configurado (p. ej. un preview sin
  // variables de entorno), igual renderizamos la landing en vez de tirar 500.
  let isLoggedIn = false;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    isLoggedIn = Boolean(data.user);
  } catch {
    isLoggedIn = false;
  }
  if (isLoggedIn) redirect("/dashboard");

  const { dict, locale } = await getServerDictionary();
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

  return (
    <>
      <JsonLd faq={dict.faq} pricing={dict.pricing} locale={locale} />
      <LandingShell t={t} />
    </>
  );
}
