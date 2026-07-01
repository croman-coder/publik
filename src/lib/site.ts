// Production URL — set NEXT_PUBLIC_SITE_URL en Vercel al dominio real.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://publik.com.py"
).replace(/\/$/, "");

export const SITE_NAME = "PUBLIK";

export const SITE_DESCRIPTION = {
  es: "PUBLIK permite a los agentes inmobiliarios de Paraguay publicar propiedades en Infocasas, Facebook, Marketplace e Instagram desde un solo lugar. Cargás una vez, publicás en todos.",
  en: "PUBLIK lets real estate agents in Paraguay publish properties to Infocasas, Facebook, Marketplace and Instagram from one place. Load once, publish everywhere.",
} as const;

export const SITE_TITLE = {
  es: "PUBLIK: Publicá tus propiedades en todos los portales",
  en: "PUBLIK: Publish your properties to every portal",
} as const;
