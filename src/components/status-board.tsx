"use client";
import {
  PORTALES,
  type Portal,
  type EstadoPublicacion,
} from "../domain/property";
import { useI18n } from "../i18n/client";

export function StatusBoard({
  publications,
}: {
  publications: { portal: Portal; estado: EstadoPublicacion }[];
}) {
  const { dict } = useI18n();
  const byPortal = new Map(publications.map((p) => [p.portal, p.estado]));
  return (
    <div className="flex flex-wrap gap-2">
      {PORTALES.map((portal) => {
        const estado = byPortal.get(portal) ?? "pendiente";
        return (
          <span key={portal} className="text-xs border rounded px-2 py-1">
            {dict.status.portal[portal]}: {dict.status.estado[estado]}
          </span>
        );
      })}
    </div>
  );
}
