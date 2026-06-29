import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

const PORTALS = ["Infocasas", "Facebook", "Marketplace", "Instagram", "Clasipar"];

const FEATURES = [
  {
    title: "Una carga, todos los portales",
    desc: "Cargás la propiedad una sola vez y PUBLIK la publica en Infocasas, Facebook, Marketplace e Instagram.",
    icon: <path d="M3 7h18M3 12h18M3 17h18" strokeLinecap="round" />,
  },
  {
    title: "Fotos y datos sincronizados",
    desc: "Subís las fotos y los datos una vez. Cada portal recibe lo que necesita, en su formato.",
    icon: (
      <path
        d="m3 16 5-5 4 4 3-3 6 6M4 4h16v16H4z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Estado en vivo",
    desc: "Mirá en tiempo real qué propiedad ya se publicó en cada portal y cuál sigue pendiente.",
    icon: (
      <path
        d="M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const STEPS = [
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
    features: ["Todo lo de Inicial", "Más publicaciones", "Soporte prioritario"],
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

const FAQ = [
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
];

function Check() {
  return (
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
  );
}

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/dashboard");

  return (
    <div className="min-h-dvh bg-white text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-xl font-bold tracking-tight text-orange-600">
            PUBLIK
          </span>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#como" className="transition hover:text-slate-900">
              Cómo funciona
            </a>
            <a href="#precios" className="transition hover:text-slate-900">
              Precios
            </a>
            <a href="#preguntas" className="transition hover:text-slate-900">
              Preguntas
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:text-orange-600"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
            >
              Probar gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-orange-200/50 blur-3xl" />
          <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Para agentes inmobiliarios de Paraguay
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl">
              Publicá en{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                todos los portales
              </span>{" "}
              desde un solo lugar.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-600 lg:mx-0">
              Basta de saltar de pantalla en pantalla. Cargás la propiedad una
              vez y PUBLIK la publica en Infocasas, Facebook, Marketplace e
              Instagram.
            </p>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <Link
                href="/login"
                className="w-full rounded-lg bg-orange-600 px-6 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-orange-700 sm:w-auto"
              >
                Empezar gratis
              </Link>
              <a
                href="#precios"
                className="w-full rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              >
                Ver precios
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Sin tarjeta · Cancelás cuando quieras
            </p>
          </div>

          {/* Dashboard preview mockup */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
              <div className="flex items-center gap-1.5 pb-4">
                <span className="h-3 w-3 rounded-full bg-slate-200" />
                <span className="h-3 w-3 rounded-full bg-slate-200" />
                <span className="h-3 w-3 rounded-full bg-slate-200" />
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-slate-900">
                      Casa en Lambaré
                    </div>
                    <div className="text-sm text-slate-500">
                      3 dorm · USD 145.000
                    </div>
                  </div>
                  <span className="rounded-lg bg-orange-600 px-2.5 py-1 text-xs font-semibold text-white">
                    Publicar
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    { p: "Infocasas", ok: true },
                    { p: "Facebook", ok: true },
                    { p: "Marketplace", ok: true },
                    { p: "Instagram", ok: false },
                  ].map((row) => (
                    <div
                      key={row.p}
                      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                    >
                      <span className="text-slate-700">{row.p}</span>
                      {row.ok ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Listo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          En curso
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portals strip */}
        <div className="border-y border-slate-100 bg-slate-50/60">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-6">
            <span className="text-sm font-medium text-slate-400">
              Publicá en
            </span>
            {PORTALS.map((p) => (
              <span
                key={p}
                className="text-base font-semibold text-slate-500"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Todo el trabajo pesado, automático
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Dejá de copiar y pegar avisos. PUBLIK se encarga de cada portal
              por vos.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
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
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como" className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Cómo funciona
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              De la carga a la publicación en tres pasos.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="relative">
                <span className="text-5xl font-bold text-orange-200">
                  {s.n}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precios" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Planes y precios
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Elegí según cuántas publicaciones hacés por mes. Sin contratos.
            </p>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative flex flex-col rounded-2xl border bg-white p-8 ${
                  p.highlight
                    ? "border-orange-600 shadow-xl shadow-orange-100 lg:-translate-y-2"
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
                  <span className="text-5xl font-bold tracking-tight">
                    ${p.price}
                  </span>
                  <span className="text-slate-500">/ mes</span>
                </div>
                <p className="mt-2 text-sm font-medium text-orange-600">
                  {p.posts}
                </p>
                <ul className="mt-7 space-y-3 text-sm text-slate-600">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <Check />
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

      {/* FAQ */}
      <section id="preguntas" className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Preguntas frecuentes
          </h2>
          <div className="mt-12 space-y-4">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-slate-200 bg-white p-5 [&_summary]:cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-slate-900 marker:content-none">
                  {item.q}
                  <svg
                    className="h-5 w-5 flex-none text-slate-400 transition group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m5 8 5 5 5-5"
                    />
                  </svg>
                </summary>
                <p className="mt-3 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 to-amber-500 px-8 py-16 text-center text-white sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
            />
            <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
              Empezá a publicar hoy
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-orange-50">
              Creá tu cuenta gratis y publicá tu primera propiedad en minutos.
            </p>
            <Link
              href="/login"
              className="relative mt-8 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-orange-700 shadow-sm transition hover:bg-orange-50"
            >
              Crear mi cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <span className="text-lg font-bold text-orange-600">PUBLIK</span>
          <nav className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#precios" className="hover:text-slate-900">
              Precios
            </a>
            <a href="#preguntas" className="hover:text-slate-900">
              Preguntas
            </a>
            <Link href="/login" className="hover:text-slate-900">
              Iniciar sesión
            </Link>
          </nav>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} PUBLIK. Hecho en Paraguay.
          </p>
        </div>
      </footer>
    </div>
  );
}
