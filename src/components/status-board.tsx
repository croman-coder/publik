import {
  PORTALES,
  type Portal,
  type EstadoPublicacion,
} from "../domain/property";

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
            {portal}: {estado}
          </span>
        );
      })}
    </div>
  );
}
