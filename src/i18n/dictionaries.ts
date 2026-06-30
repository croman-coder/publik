import type { Locale } from "./config";

export interface Dictionary {
  nav: {
    how: string;
    pricing: string;
    faq: string;
    signIn: string;
    tryFree: string;
  };
  hero: {
    badge: string;
    titleA: string;
    titleHighlight: string;
    titleB: string;
    subtitle: string;
    startFree: string;
    seePricing: string;
    noCard: string;
    mockTitle: string;
    mockSpecs: string;
    mockPublish: string;
    statusDone: string;
    statusInProgress: string;
    publishTo: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  how: {
    title: string;
    subtitle: string;
    steps: { n: string; title: string; desc: string }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    mostPopular: string;
    perMonth: string;
    choose: string;
    plans: {
      name: string;
      price: number;
      posts: string;
      desc: string;
      features: string[];
    }[];
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  cta: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    pricing: string;
    faq: string;
    signIn: string;
    rights: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  metrics: {
    eyebrow: string;
    title: string;
    items: { value: string; label: string }[];
    note: string;
  };
  login: {
    brandTitle: string;
    brandSubtitle: string;
    brandBullets: string[];
    brandFootnote: string;
    sentTitle: string;
    sentBody: (email: string) => string;
    useOther: string;
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    sending: string;
    submit: string;
    sendError: string;
    pricingPrompt: string;
    pricingLink: string;
  };
  dashboard: {
    brand: string;
    newProperty: string;
    signOut: string;
    myProperties: string;
    emptyText: string;
    emptyCta: string;
    back: string;
    newPropertyTitle: string;
  };
  form: {
    title: string;
    description: string;
    price: string;
    currency: string;
    operation: string;
    type: string;
    bedrooms: string;
    bathrooms: string;
    parking: string;
    builtArea: string;
    city: string;
    save: string;
    requiredError: string;
    operacion: Record<string, string>;
    tipo: Record<string, string>;
  };
  status: {
    portal: Record<string, string>;
    estado: Record<string, string>;
  };
  publish: {
    idle: string;
    publishing: string;
    success: string;
    networkError: string;
    noConnection: string;
    noPhotos: string;
    genericError: string;
  };
}

const es: Dictionary = {
  nav: {
    how: "Cómo funciona",
    pricing: "Precios",
    faq: "Preguntas",
    signIn: "Iniciar sesión",
    tryFree: "Probar gratis",
  },
  hero: {
    badge: "Para agentes inmobiliarios de Paraguay",
    titleA: "Publicá en ",
    titleHighlight: "todos los portales",
    titleB: " desde un solo lugar.",
    subtitle:
      "Basta de saltar de pantalla en pantalla. Cargás la propiedad una vez y PUBLIK la publica en Infocasas, Facebook, Marketplace e Instagram.",
    startFree: "Empezar gratis",
    seePricing: "Ver precios",
    noCard: "Sin tarjeta · Cancelás cuando quieras",
    mockTitle: "Casa en Lambaré",
    mockSpecs: "3 dorm · USD 145.000",
    mockPublish: "Publicar",
    statusDone: "Listo",
    statusInProgress: "En curso",
    publishTo: "Publicá en",
  },
  features: {
    title: "Todo el trabajo pesado, automático",
    subtitle:
      "Dejá de copiar y pegar avisos. PUBLIK se encarga de cada portal por vos.",
    items: [
      {
        title: "Una carga, todos los portales",
        desc: "Cargás la propiedad una sola vez y PUBLIK la publica en Infocasas, Facebook, Marketplace e Instagram.",
      },
      {
        title: "Fotos y datos sincronizados",
        desc: "Subís las fotos y los datos una vez. Cada portal recibe lo que necesita, en su formato.",
      },
      {
        title: "Estado en vivo",
        desc: "Mirá en tiempo real qué propiedad ya se publicó en cada portal y cuál sigue pendiente.",
      },
    ],
  },
  how: {
    title: "Cómo funciona",
    subtitle: "De la carga a la publicación en tres pasos.",
    steps: [
      {
        n: "01",
        title: "Cargá la propiedad",
        desc: "Fotos, precio, ubicación y detalles. Una sola vez, en menos de 2 minutos.",
      },
      {
        n: "02",
        title: "Elegí los portales",
        desc: "Marcá dónde querés publicar. PUBLIK arma cada aviso en el formato correcto.",
      },
      {
        n: "03",
        title: "Publicá y seguí el estado",
        desc: "Un clic y listo. Mirá en vivo qué se publicó y qué falta, sin abrir cada portal.",
      },
    ],
  },
  pricing: {
    title: "Planes y precios",
    subtitle:
      "Elegí según cuántas publicaciones hacés por mes. Sin contratos.",
    mostPopular: "Más elegido",
    perMonth: "/ mes",
    choose: "Elegir",
    plans: [
      {
        name: "Inicial",
        price: 30,
        posts: "30 publicaciones / mes",
        desc: "Para el agente que arranca.",
        features: ["Todos los portales", "Fotos sincronizadas", "Estado en vivo"],
      },
      {
        name: "Profesional",
        price: 40,
        posts: "60 publicaciones / mes",
        desc: "El plan más elegido por agentes activos.",
        features: [
          "Todo lo de Inicial",
          "Más publicaciones",
          "Soporte prioritario",
        ],
      },
      {
        name: "Agencia",
        price: 50,
        posts: "Publicaciones ilimitadas",
        desc: "Para equipos y oficinas con alto volumen.",
        features: [
          "Todo lo de Profesional",
          "Sin límite de publicaciones",
          "Varios agentes",
        ],
      },
    ],
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿Necesito tarjeta para empezar?",
        a: "No. Creás tu cuenta con el email y entrás al instante. Pagás solo cuando elegís un plan.",
      },
      {
        q: "¿En qué portales publica?",
        a: "Infocasas, Facebook, Facebook Marketplace, Instagram y Clasipar. Sumamos más con el tiempo.",
      },
      {
        q: "¿Puedo cambiar de plan?",
        a: "Sí, cuando quieras. Subís o bajás de plan según cuántas publicaciones hagas ese mes. Sin contratos.",
      },
    ],
  },
  cta: {
    title: "Empezá a publicar hoy",
    subtitle:
      "Creá tu cuenta gratis y publicá tu primera propiedad en minutos.",
    button: "Crear mi cuenta",
  },
  footer: {
    pricing: "Precios",
    faq: "Preguntas",
    signIn: "Iniciar sesión",
    rights: "Hecho en Paraguay.",
  },
  problem: {
    eyebrow: "El problema",
    title: "Publicar a mano, portal por portal, te roba el día.",
    subtitle:
      "El trabajo que más tiempo te consume no es vender: es copiar, pegar y mantener al día el mismo aviso en todos lados.",
    items: [
      {
        title: "Cargas repetidas",
        desc: "La misma propiedad, cargada cinco veces, con cinco formatos distintos. Horas que no facturás.",
      },
      {
        title: "Datos desincronizados",
        desc: "Cambiás un precio y tenés que actualizarlo, uno por uno, en cada portal. Algo siempre queda mal.",
      },
      {
        title: "Avisos vencidos",
        desc: "Un dato desactualizado y perdés la consulta. Pasa más seguido de lo que te gustaría.",
      },
    ],
  },
  metrics: {
    eyebrow: "Por qué PUBLIK",
    title: "Menos tiempo publicando. Más tiempo cerrando.",
    items: [
      { value: "1", label: "Carga por propiedad" },
      { value: "5", label: "Portales en un clic" },
      { value: "2 min", label: "Para publicar en todos" },
      { value: "100%", label: "Estado sincronizado" },
    ],
    note: "Infocasas, Facebook, Marketplace, Instagram y Clasipar.",
  },
  login: {
    brandTitle: "Publicá en todos los portales desde un solo lugar.",
    brandSubtitle:
      "Infocasas, Facebook, Marketplace e Instagram. Cargás la propiedad una vez y PUBLIK la publica en todas partes.",
    brandBullets: [
      "Una sola carga, todos los portales",
      "Fotos y datos sincronizados",
      "Estado de publicación en vivo",
    ],
    brandFootnote: "Hecho para agentes inmobiliarios de Paraguay.",
    sentTitle: "Revisá tu email",
    sentBody: (email) =>
      `Te enviamos un enlace de acceso a ${email}. Abrilo desde este dispositivo para entrar.`,
    useOther: "Usar otro email",
    title: "Ingresá a tu cuenta",
    subtitle: "Te mandamos un enlace mágico al email. Sin contraseñas.",
    emailLabel: "Email",
    emailPlaceholder: "tu@email.com",
    sending: "Enviando…",
    submit: "Ingresar",
    sendError:
      "No pudimos enviar el enlace. Revisá el email e intentá de nuevo.",
    pricingPrompt: "¿Querés ver planes y precios?",
    pricingLink: "Conocé PUBLIK",
  },
  dashboard: {
    brand: "PUBLIK",
    newProperty: "Nueva propiedad",
    signOut: "Salir",
    myProperties: "Mis propiedades",
    emptyText: "Todavía no cargaste ninguna propiedad.",
    emptyCta: "Cargar mi primera propiedad",
    back: "← Volver",
    newPropertyTitle: "Nueva propiedad",
  },
  form: {
    title: "Título",
    description: "Descripción",
    price: "Precio",
    currency: "Moneda",
    operation: "Operación",
    type: "Tipo",
    bedrooms: "Dormitorios",
    bathrooms: "Baños",
    parking: "Cocheras",
    builtArea: "Sup. construida (m²)",
    city: "Ciudad",
    save: "Guardar",
    requiredError: "Revisá los campos obligatorios.",
    operacion: {
      venta: "Venta",
      alquiler: "Alquiler",
      alquiler_temporal: "Alquiler temporal",
    },
    tipo: {
      casa: "Casa",
      departamento: "Departamento",
      terreno: "Terreno",
      local: "Local",
      oficina: "Oficina",
      deposito: "Depósito",
    },
  },
  status: {
    portal: {
      infocasas: "Infocasas",
      marketplace: "Marketplace",
      clasipar: "Clasipar",
      fb_page: "Facebook",
      instagram: "Instagram",
    },
    estado: {
      pendiente: "Pendiente",
      publicando: "Publicando",
      publicada: "Publicada",
      error: "Error",
    },
  },
  publish: {
    idle: "Publicar en FB/IG",
    publishing: "Publicando…",
    success: "Publicado en Facebook e Instagram.",
    networkError: "Error de red. Intentá de nuevo.",
    noConnection: "Conectá tu página de Facebook primero.",
    noPhotos: "Subí al menos una foto antes de publicar.",
    genericError: "No se pudo publicar. Intentá de nuevo.",
  },
};

const en: Dictionary = {
  nav: {
    how: "How it works",
    pricing: "Pricing",
    faq: "FAQ",
    signIn: "Sign in",
    tryFree: "Try for free",
  },
  hero: {
    badge: "For real estate agents in Paraguay",
    titleA: "Publish to ",
    titleHighlight: "every portal",
    titleB: " from one place.",
    subtitle:
      "No more jumping from screen to screen. Load a property once and PUBLIK publishes it to Infocasas, Facebook, Marketplace and Instagram.",
    startFree: "Start free",
    seePricing: "See pricing",
    noCard: "No card required · Cancel anytime",
    mockTitle: "House in Lambaré",
    mockSpecs: "3 bd · USD 145,000",
    mockPublish: "Publish",
    statusDone: "Done",
    statusInProgress: "In progress",
    publishTo: "Publish to",
  },
  features: {
    title: "All the heavy lifting, automatic",
    subtitle:
      "Stop copying and pasting listings. PUBLIK handles every portal for you.",
    items: [
      {
        title: "One upload, every portal",
        desc: "Load a property once and PUBLIK publishes it to Infocasas, Facebook, Marketplace and Instagram.",
      },
      {
        title: "Photos and data in sync",
        desc: "Upload photos and details once. Each portal gets exactly what it needs, in its own format.",
      },
      {
        title: "Live status",
        desc: "See in real time which property is already published on each portal and which is still pending.",
      },
    ],
  },
  how: {
    title: "How it works",
    subtitle: "From upload to published in three steps.",
    steps: [
      {
        n: "01",
        title: "Add the property",
        desc: "Photos, price, location and details. Just once, in under 2 minutes.",
      },
      {
        n: "02",
        title: "Pick the portals",
        desc: "Choose where to publish. PUBLIK builds each listing in the right format.",
      },
      {
        n: "03",
        title: "Publish and track",
        desc: "One click and done. Watch live what's published and what's left, without opening each portal.",
      },
    ],
  },
  pricing: {
    title: "Plans and pricing",
    subtitle:
      "Choose based on how many listings you post per month. No contracts.",
    mostPopular: "Most popular",
    perMonth: "/ mo",
    choose: "Choose",
    plans: [
      {
        name: "Starter",
        price: 30,
        posts: "30 listings / month",
        desc: "For the agent just getting started.",
        features: ["All portals", "Synced photos", "Live status"],
      },
      {
        name: "Professional",
        price: 40,
        posts: "60 listings / month",
        desc: "The plan most chosen by active agents.",
        features: [
          "Everything in Starter",
          "More listings",
          "Priority support",
        ],
      },
      {
        name: "Agency",
        price: 50,
        posts: "Unlimited listings",
        desc: "For teams and offices with high volume.",
        features: [
          "Everything in Professional",
          "No listing limit",
          "Multiple agents",
        ],
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Do I need a card to start?",
        a: "No. Create your account with your email and get in instantly. You only pay when you choose a plan.",
      },
      {
        q: "Which portals does it publish to?",
        a: "Infocasas, Facebook, Facebook Marketplace, Instagram and Clasipar. We add more over time.",
      },
      {
        q: "Can I change plans?",
        a: "Yes, whenever you want. Move up or down based on how many listings you post that month. No contracts.",
      },
    ],
  },
  cta: {
    title: "Start publishing today",
    subtitle:
      "Create your free account and publish your first property in minutes.",
    button: "Create my account",
  },
  footer: {
    pricing: "Pricing",
    faq: "FAQ",
    signIn: "Sign in",
    rights: "Made in Paraguay.",
  },
  problem: {
    eyebrow: "The problem",
    title: "Posting by hand, portal by portal, eats your day.",
    subtitle:
      "The work that takes the most time isn't selling — it's copying, pasting and keeping the same listing up to date everywhere.",
    items: [
      {
        title: "Repeated uploads",
        desc: "The same property, loaded five times, in five different formats. Hours you don't bill.",
      },
      {
        title: "Out-of-sync data",
        desc: "Change a price and you have to update it, one by one, on every portal. Something is always off.",
      },
      {
        title: "Stale listings",
        desc: "One outdated detail and you lose the lead. It happens more often than you'd like.",
      },
    ],
  },
  metrics: {
    eyebrow: "Why PUBLIK",
    title: "Less time posting. More time closing.",
    items: [
      { value: "1", label: "Upload per property" },
      { value: "5", label: "Portals in one click" },
      { value: "2 min", label: "To publish everywhere" },
      { value: "100%", label: "Status in sync" },
    ],
    note: "Infocasas, Facebook, Marketplace, Instagram and Clasipar.",
  },
  login: {
    brandTitle: "Publish to every portal from one place.",
    brandSubtitle:
      "Infocasas, Facebook, Marketplace and Instagram. Load a property once and PUBLIK publishes it everywhere.",
    brandBullets: [
      "One upload, every portal",
      "Photos and data in sync",
      "Live publishing status",
    ],
    brandFootnote: "Built for real estate agents in Paraguay.",
    sentTitle: "Check your email",
    sentBody: (email) =>
      `We sent a sign-in link to ${email}. Open it on this device to get in.`,
    useOther: "Use a different email",
    title: "Sign in to your account",
    subtitle: "We'll email you a magic link. No passwords.",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    sending: "Sending…",
    submit: "Sign in",
    sendError: "We couldn't send the link. Check your email and try again.",
    pricingPrompt: "Want to see plans and pricing?",
    pricingLink: "Discover PUBLIK",
  },
  dashboard: {
    brand: "PUBLIK",
    newProperty: "New property",
    signOut: "Sign out",
    myProperties: "My properties",
    emptyText: "You haven't added any properties yet.",
    emptyCta: "Add my first property",
    back: "← Back",
    newPropertyTitle: "New property",
  },
  form: {
    title: "Title",
    description: "Description",
    price: "Price",
    currency: "Currency",
    operation: "Operation",
    type: "Type",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    parking: "Parking",
    builtArea: "Built area (m²)",
    city: "City",
    save: "Save",
    requiredError: "Please fill in the required fields.",
    operacion: {
      venta: "Sale",
      alquiler: "Rent",
      alquiler_temporal: "Short-term rent",
    },
    tipo: {
      casa: "House",
      departamento: "Apartment",
      terreno: "Land",
      local: "Retail space",
      oficina: "Office",
      deposito: "Warehouse",
    },
  },
  status: {
    portal: {
      infocasas: "Infocasas",
      marketplace: "Marketplace",
      clasipar: "Clasipar",
      fb_page: "Facebook",
      instagram: "Instagram",
    },
    estado: {
      pendiente: "Pending",
      publicando: "Publishing",
      publicada: "Published",
      error: "Error",
    },
  },
  publish: {
    idle: "Publish to FB/IG",
    publishing: "Publishing…",
    success: "Published to Facebook and Instagram.",
    networkError: "Network error. Please try again.",
    noConnection: "Connect your Facebook page first.",
    noPhotos: "Upload at least one photo before publishing.",
    genericError: "Couldn't publish. Please try again.",
  },
};

const DICTIONARIES: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
