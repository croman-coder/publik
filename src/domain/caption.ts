import type { Property } from "./property";

const OPERACION_LABEL: Record<Property["operacion"], string> = {
  venta: "Venta",
  alquiler: "Alquiler",
  alquiler_temporal: "Alquiler temporal",
};

const TIPO_LABEL: Record<Property["tipo"], string> = {
  casa: "Casa",
  departamento: "Departamento",
  terreno: "Terreno",
  local: "Local",
  oficina: "Oficina",
  deposito: "Depósito",
};

function formatPrice(precio: number, moneda: Property["moneda"]): string {
  const n = new Intl.NumberFormat("es-PY").format(precio);
  return moneda === "USD" ? `USD ${n}` : `Gs. ${n}`;
}

/**
 * Builds the social caption posted to Facebook Page / Instagram from the
 * canonical property. The agent's descripcion leads; structured facts follow.
 */
export function buildCaption(property: Property): string {
  const lines: string[] = [];

  lines.push(property.titulo);
  lines.push("");
  lines.push(property.descripcion);
  lines.push("");

  const header = `${OPERACION_LABEL[property.operacion]} · ${TIPO_LABEL[property.tipo]}`;
  lines.push(header);
  lines.push(formatPrice(property.precio, property.moneda));

  const specs: string[] = [];
  if (property.dormitorios > 0) specs.push(`${property.dormitorios} dorm.`);
  if (property.banos > 0) specs.push(`${property.banos} baños`);
  if (property.cocheras > 0) specs.push(`${property.cocheras} cocheras`);
  if (property.superficieConstruidaM2)
    specs.push(`${property.superficieConstruidaM2} m² const.`);
  if (property.superficieTerrenoM2)
    specs.push(`${property.superficieTerrenoM2} m² terreno`);
  if (specs.length) lines.push(specs.join(" · "));

  const ubicacion = [property.barrio, property.ciudad]
    .filter(Boolean)
    .join(", ");
  if (ubicacion) lines.push(`📍 ${ubicacion}`);

  if (property.amenities.length) lines.push(property.amenities.join(" · "));

  return lines.join("\n").trim();
}
