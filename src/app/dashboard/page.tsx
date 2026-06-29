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

  return (
    <main className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Mis propiedades</h1>
        <Link
          href="/dashboard/properties/new"
          className="bg-orange-600 text-white rounded px-4 py-2"
        >
          Nueva propiedad
        </Link>
      </div>
      <ul className="space-y-4">
        {(props ?? []).map((p) => (
          <li key={p.id} className="border rounded p-4 space-y-2">
            <div className="font-medium">
              {p.titulo} — {p.ciudad}
            </div>
            <StatusBoard
              publications={
                (p.portal_publications ?? []) as {
                  portal: Portal;
                  estado: EstadoPublicacion;
                }[]
              }
            />
            <PublishMetaButton propertyId={p.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}
