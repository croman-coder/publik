import type { Dictionary } from "@/i18n/dictionaries";

export type LandingDict = Pick<
  Dictionary,
  | "nav"
  | "hero"
  | "problem"
  | "how"
  | "features"
  | "metrics"
  | "pricing"
  | "faq"
  | "cta"
  | "footer"
>;

export const PORTALS = [
  "Infocasas",
  "Facebook",
  "Marketplace",
  "Instagram",
  "Clasipar",
] as const;
