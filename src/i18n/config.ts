export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_COOKIE = "lang";

export function isLocale(value: string | undefined): value is Locale {
  return value === "es" || value === "en";
}
