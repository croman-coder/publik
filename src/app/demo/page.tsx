import Link from "next/link";
import type { Metadata } from "next";
import { LanguageToggle } from "../../components/language-toggle";
import { getServerDictionary } from "../../i18n/server";
import { DEMO_PROPERTIES } from "./data";
import type { EstadoPublicacion } from "../../domain/property";

export const metadata: Metadata = {
  title: "Demo del dashboard",
  robots: { index: false, follow: false },
};

const estadoStyle: Record<EstadoPublicacion, { dot: string; text: string; pulse?: boolean }> = {
  publicada: { dot: "bg-emerald-500", text: "text-emerald-700" },
  publicando: { dot: "bg-amber-500", text: "text-amber-700", pulse: true },
  pendiente: { dot: "bg-slate-300", text: "text-slate-500" },
  error: { dot: "bg-red-500", text: "text-red-600" },
};

const operacionBadge: Record<string, string> = {
  venta: "bg-orange-100 text-orange-700",
  alquiler: "bg-sky-100 text-sky-700",
  alquiler_temporal: "bg-violet-100 text-violet-700",
};

function Stat({ n, label, accent }: { n: number; label: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className={`text-2xl font-bold ${accent ? "text-orange-600" : "text-slate-900"}`}>{n}</div>
      <div className="mt-0.5 text-xs text-slate-500">{label}</div>
    </div>
  );
}

export default async function DemoPage() {
  const { dict } = await getServerDictionary();
  const props = DEMO_PROPERTIES;
  const pubs = props.flatMap((p) => p.publications);
  const publicadas = pubs.filter((p) => p.estado === "publicada").length;
  const enProceso = pubs.filter((p) => p.estado === "publicando").length;
  const pendientes = pubs.filter((p) => p.estado === "pendiente" || p.estado === "error").length;

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900">
      <div className="bg-orange-600 px-4 py-2 text-center text-sm font-medium text-white">
        Modo demo con datos de ejemplo.{" "}
        <Link href="/" className="underline underline-offset-2 hover:no-underline">
          Volver al sitio
        </Link>
      </div>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-[0.04em] text-orange-600">
            PUBLIK
          </Link>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <span
              aria-disabled
              className="cursor-not-allowed rounded-lg bg-orange-600/60 px-4 py-2 text-sm font-semibold text-white"
            >
              {dict.dashboard.newProperty}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold">{dict.dashboard.myProperties}</h1>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat n={props.length} label="Propiedades" />
            <Stat n={publicadas} label="Publicaciones activas" accent />
            <Stat n={enProceso} label="En proceso" />
            <Stat n={pendientes} label="Pendientes" />
          </div>
        </div>

        <ul className="space-y-4">
          {props.map((p) => (
            <li key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${operacionBadge[p.operacion]}`}
                    >
                      {dict.form.operacion[p.operacion]}
                    </span>
                    <span className="text-xs text-slate-400">{dict.form.tipo[p.tipo]}</span>
                  </div>
                  <div className="mt-1.5 font-semibold text-slate-900">{p.titulo}</div>
                  <div className="text-sm text-slate-500">
                    {p.barrio}, {p.ciudad}
                    {p.dormitorios > 0 ? ` · ${p.dormitorios} dorm · ${p.banos} baños` : ""}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900">{p.precio}</div>
                  <span className="mt-1.5 inline-block cursor-not-allowed rounded-lg bg-orange-600/70 px-3 py-1.5 text-xs font-semibold text-white">
                    Publicar en FB/IG
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                {p.publications.map((pub) => {
                  const st = estadoStyle[pub.estado];
                  return (
                    <span
                      key={pub.portal}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${st.dot} ${st.pulse ? "animate-pulse" : ""}`} />
                      <span className="text-slate-600">{dict.status.portal[pub.portal]}</span>
                      <span className={`font-medium ${st.text}`}>{dict.status.estado[pub.estado]}</span>
                    </span>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
