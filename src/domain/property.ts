export const OPERACIONES = ["venta", "alquiler", "alquiler_temporal"] as const;
export type Operacion = (typeof OPERACIONES)[number];

export const TIPOS = [
  "casa", "departamento", "terreno", "local", "oficina", "deposito",
] as const;
export type Tipo = (typeof TIPOS)[number];

export const MONEDAS = ["USD", "PYG"] as const;
export type Moneda = (typeof MONEDAS)[number];

export const PORTALES = [
  "infocasas", "marketplace", "clasipar", "fb_page", "instagram",
] as const;
export type Portal = (typeof PORTALES)[number];

export type EstadoPublicacion =
  | "pendiente" | "publicando" | "publicada" | "error";

export interface Property {
  id: string;
  agencyId: string;
  agentId: string;
  operacion: Operacion;
  tipo: Tipo;
  precio: number;
  moneda: Moneda;
  dormitorios: number;
  banos: number;
  cocheras: number;
  superficieTerrenoM2: number | null;
  superficieConstruidaM2: number | null;
  pais: string;
  ciudad: string;
  barrio: string | null;
  direccion: string | null;
  lat: number | null;
  lng: number | null;
  titulo: string;
  descripcion: string;
  amenities: string[];
  estado: "borrador" | "publicando" | "publicada";
}

export interface Photo {
  id: string;
  propertyId: string;
  storageUrl: string;
  orden: number;
}
