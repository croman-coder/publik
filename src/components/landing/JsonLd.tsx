import type { Dictionary } from "@/i18n/dictionaries";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export function JsonLd({
  faq,
  pricing,
  locale,
}: {
  faq: Dictionary["faq"];
  pricing: Dictionary["pricing"];
  locale: "es" | "en";
}) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/opengraph-image`,
        description: SITE_DESCRIPTION[locale],
        areaServed: { "@type": "Country", name: "Paraguay" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: SITE_URL,
        inLanguage: locale,
        description: SITE_DESCRIPTION[locale],
        offers: pricing.plans.map((p) => ({
          "@type": "Offer",
          name: p.name,
          price: String(p.price),
          priceCurrency: "USD",
          category: p.posts,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
