import Link from "next/link";
import { createClient } from "../../lib/supabase/server";
import { StatusBoard } from "../../components/status-board";
import { PublishMetaButton } from "../../components/publish-meta-button";
import type { Portal, EstadoPublicacion } from "../../domain/property";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: props } = await supabase
    .from("properties")
    .select("id, titulo, ciudad, estado, portal_publications(portal, estado)")
    .order("created_at", { ascending: false });

  const list = props ?? [];

  return (
    <main className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Mis propiedades</h1>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-600">
            Todavía no cargaste ninguna propiedad.
          </p>
          <Link
            href="/dashboard/properties/new"
            className="mt-4 inline-block rounded-lg bg-orange-600 px-5 py-2.5 font-semibold text-white transition hover:bg-orange-700"
          >
            Cargar mi primera propiedad
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {list.map((p) => (
            <li
              key={p.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-slate-900">{p.titulo}</div>
                  <div className="text-sm text-slate-500">{p.ciudad}</div>
                </div>
                <PublishMetaButton propertyId={p.id} />
              </div>
              <div className="mt-4">
                <StatusBoard
                  publications={
                    (p.portal_publications ?? []) as {
                      portal: Portal;
                      estado: EstadoPublicacion;
                    }[]
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
