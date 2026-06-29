import { z } from "zod";
import { OPERACIONES, TIPOS, MONEDAS } from "./property";

export const propertyInputSchema = z.object({
  operacion: z.enum(OPERACIONES),
  tipo: z.enum(TIPOS),
  precio: z.number().positive(),
  moneda: z.enum(MONEDAS),
  dormitorios: z.number().int().min(0).default(0),
  banos: z.number().int().min(0).default(0),
  cocheras: z.number().int().min(0).default(0),
  superficieTerrenoM2: z.number().positive().nullable().default(null),
  superficieConstruidaM2: z.number().positive().nullable().default(null),
  pais: z.string().min(1),
  ciudad: z.string().min(1),
  barrio: z.string().nullable().default(null),
  direccion: z.string().nullable().default(null),
  lat: z.number().nullable().default(null),
  lng: z.number().nullable().default(null),
  titulo: z.string().min(1),
  descripcion: z.string().min(1),
  amenities: z.array(z.string()).default([]),
});

export type PropertyInput = z.infer<typeof propertyInputSchema>;

export function validatePropertyInput(input: unknown) {
  return propertyInputSchema.safeParse(input);
}
