import {
  PORTALES,
  type Portal,
  type EstadoPublicacion,
} from "../domain/property";

const PORTAL_LABEL: Record<Portal, string> = {
  infocasas: "Infocasas",
  marketplace: "Marketplace",
  clasipar: "Clasipar",
  fb_page: "Facebook",
  instagram: "Instagram",
};

const ESTADO_LABEL: Record<EstadoPublicacion, string> = {
  pendiente: "Pending",
  publicando: "Publishing",
  publicada: "Published",
  error: "Error",
};

export function StatusBoard({
  publications,
}: {
  publications: { portal: Portal; estado: EstadoPublicacion }[];
}) {
  const byPortal = new Map(publications.map((p) => [p.portal, p.estado]));
  return (
    <div className="flex flex-wrap gap-2">
      {PORTALES.map((portal) => {
        const estado = byPortal.get(portal) ?? "pendiente";
        return (
          <span key={portal} className="text-xs border rounded px-2 py-1">
            {PORTAL_LABEL[portal]}: {ESTADO_LABEL[estado]}
          </span>
        );
      })}
    </div>
  );
}
