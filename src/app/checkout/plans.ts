export const PLANS = {
  inicial: {
    slug: "inicial",
    name: "Inicial",
    price: 30,
    currency: "USD" as const,
    posts: "30 publicaciones por mes",
  },
  profesional: {
    slug: "profesional",
    name: "Profesional",
    price: 40,
    currency: "USD" as const,
    posts: "60 publicaciones por mes",
  },
  agencia: {
    slug: "agencia",
    name: "Agencia",
    price: 50,
    currency: "USD" as const,
    posts: "Publicaciones ilimitadas",
  },
} as const;

export type PlanSlug = keyof typeof PLANS;

export function isPlanSlug(v: string | undefined): v is PlanSlug {
  return v === "inicial" || v === "profesional" || v === "agencia";
}
