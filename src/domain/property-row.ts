import type { Property } from "./property";

/** Shape of a `properties` row as returned by Supabase (snake_case). */
export interface PropertyRow {
  id: string;
  agency_id: string;
  agent_id: string;
  operacion: Property["operacion"];
  tipo: Property["tipo"];
  precio: number;
  moneda: Property["moneda"];
  dormitorios: number;
  banos: number;
  cocheras: number;
  superficie_terreno_m2: number | null;
  superficie_construida_m2: number | null;
  pais: string;
  ciudad: string;
  barrio: string | null;
  direccion: string | null;
  lat: number | null;
  lng: number | null;
  titulo: string;
  descripcion: string;
  amenities: string[];
  estado: Property["estado"];
}

/** Maps a Supabase `properties` row to the canonical Property model. */
export function rowToProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    agencyId: row.agency_id,
    agentId: row.agent_id,
    operacion: row.operacion,
    tipo: row.tipo,
    precio: row.precio,
    moneda: row.moneda,
    dormitorios: row.dormitorios,
    banos: row.banos,
    cocheras: row.cocheras,
    superficieTerrenoM2: row.superficie_terreno_m2,
    superficieConstruidaM2: row.superficie_construida_m2,
    pais: row.pais,
    ciudad: row.ciudad,
    barrio: row.barrio,
    direccion: row.direccion,
    lat: row.lat,
    lng: row.lng,
    titulo: row.titulo,
    descripcion: row.descripcion,
    amenities: row.amenities ?? [],
    estado: row.estado,
  };
}
