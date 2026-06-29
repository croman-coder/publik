import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

const FEATURES = [
  {
    title: "Una carga, todos los portales",
    desc: "Cargás la propiedad una sola vez y PUBLIK la publica en Infocasas, Facebook, Marketplace e Instagram.",
    icon: (
      <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />
    ),
  },
  {
    title: "Fotos y datos sincronizados",
    desc: "Subís las fotos y los datos una vez. Cada portal recibe lo que necesita, en su formato.",
    icon: (
      <path d="m3 16 5-5 4 4 3-3 6 6M4 4h16v16H4z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Estado en vivo",
    desc: "Mirá en tiempo real qué propiedad ya se publicó en cada portal y cuál sigue pendiente.",
    icon: (
      <path d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
];

const PLANS = [
  {
    name: "Inicial",
    price: 30,
    posts: "30 publicaciones / mes",
    desc: "Para el agente que arranca.",
    highlight: false,
    features: ["Todos los portales", "Fotos sincronizadas", "Estado en vivo"],
  },
  {
    name: "Profesional",
    price: 40,
    posts: "60 publicaciones / mes",
    desc: "El plan más elegido por agentes activos.",
    highlight: true,
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
    highlight: false,
    features: [
      "Todo lo de Profesional",
      "Sin límite de publicaciones",
      "Varios agentes",
    ],
  },
];

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/dashboard");

  return (
    <div className="min-h-dvh bg-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold tracking-tight text-orange-600">
            PUBLIK
          </span>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#precios" className="hidden sm:block text-slate-600 hover:text-slate-900">
              Precios
            </a>
            <Link
              href="/login"
              className="rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white transition hover:bg-orange-700"
            >
              Ingresar
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28 text-center">
        <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
          Para agentes inmobiliarios de Paraguay
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-6xl">
          Publicá tus propiedades en{" "}
          <span className="text-orange-600">todos los portales</span> desde un
          solo lugar.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Basta de saltar de pantalla en pantalla. Cargás la propiedad una vez y
          PUBLIK la publica en Infocasas, Facebook, Marketplace e Instagram.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="w-full sm:w-auto rounded-lg bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Empezar ahora
          </Link>
          <a
            href="#precios"
            className="w-full sm:w-auto rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Ver precios
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">
            Todo el trabajo pesado, automático
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden
                  >
                    {f.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precios" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">Planes y precios</h2>
          <p className="mt-3 text-center text-slate-600">
            Elegí según cuántas publicaciones hacés por mes. Sin contratos.
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  p.highlight
                    ? "border-orange-600 shadow-lg shadow-orange-100"
                    : "border-slate-200"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
                    Más elegido
                  </span>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{p.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${p.price}</span>
                  <span className="text-slate-500">/ mes</span>
                </div>
                <p className="mt-1 text-sm font-medium text-orange-600">
                  {p.posts}
                </p>
                <ul className="mt-6 space-y-3 text-sm text-slate-600">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <svg
                        className="h-5 w-5 flex-none text-orange-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/login"
                  className={`mt-8 rounded-lg px-4 py-2.5 text-center font-semibold transition ${
                    p.highlight
                      ? "bg-orange-600 text-white hover:bg-orange-700"
                      : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Elegir {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <span className="font-bold text-orange-600">PUBLIK</span>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} PUBLIK. Hecho en Paraguay.
          </p>
        </div>
      </footer>
    </div>
  );
}
