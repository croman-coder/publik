import type { Portal, EstadoPublicacion } from "../../domain/property";

export interface DemoProperty {
  id: string;
  titulo: string;
  operacion: "venta" | "alquiler" | "alquiler_temporal";
  tipo: string;
  ciudad: string;
  barrio: string;
  dormitorios: number;
  banos: number;
  precio: string;
  publications: { portal: Portal; estado: EstadoPublicacion }[];
}

const P = (
  infocasas: EstadoPublicacion,
  marketplace: EstadoPublicacion,
  clasipar: EstadoPublicacion,
  fb_page: EstadoPublicacion,
  instagram: EstadoPublicacion,
): { portal: Portal; estado: EstadoPublicacion }[] => [
  { portal: "infocasas", estado: infocasas },
  { portal: "marketplace", estado: marketplace },
  { portal: "clasipar", estado: clasipar },
  { portal: "fb_page", estado: fb_page },
  { portal: "instagram", estado: instagram },
];

export const DEMO_PROPERTIES: DemoProperty[] = [
  {
    id: "d1",
    titulo: "Casa moderna con piscina",
    operacion: "venta",
    tipo: "casa",
    ciudad: "Lambaré",
    barrio: "Santa Rosa",
    dormitorios: 3,
    banos: 3,
    precio: "USD 145.000",
    publications: P("publicada", "publicada", "publicada", "publicada", "publicando"),
  },
  {
    id: "d2",
    titulo: "Departamento a estrenar",
    operacion: "venta",
    tipo: "departamento",
    ciudad: "Asunción",
    barrio: "Villa Morra",
    dormitorios: 2,
    banos: 2,
    precio: "USD 98.000",
    publications: P("publicada", "publicada", "pendiente", "publicada", "pendiente"),
  },
  {
    id: "d3",
    titulo: "Dúplex con jardín",
    operacion: "alquiler",
    tipo: "casa",
    ciudad: "San Lorenzo",
    barrio: "Barrio Obrero",
    dormitorios: 4,
    banos: 3,
    precio: "Gs 6.500.000 / mes",
    publications: P("publicada", "error", "publicada", "publicada", "publicada"),
  },
  {
    id: "d4",
    titulo: "Terreno en zona alta",
    operacion: "venta",
    tipo: "terreno",
    ciudad: "Luque",
    barrio: "Isla Bogado",
    dormitorios: 0,
    banos: 0,
    precio: "USD 62.000",
    publications: P("publicada", "pendiente", "pendiente", "pendiente", "pendiente"),
  },
  {
    id: "d5",
    titulo: "Oficina equipada en microcentro",
    operacion: "alquiler",
    tipo: "oficina",
    ciudad: "Asunción",
    barrio: "Centro",
    dormitorios: 0,
    banos: 1,
    precio: "USD 850 / mes",
    publications: P("publicando", "publicada", "publicada", "publicando", "pendiente"),
  },
];
