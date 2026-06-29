import { describe, it, expect } from "vitest";
import { propertyInputSchema, validatePropertyInput } from "./property-schema";

const valid = {
  operacion: "venta",
  tipo: "departamento",
  precio: 85000,
  moneda: "USD",
  dormitorios: 2,
  banos: 1,
  cocheras: 1,
  superficieConstruidaM2: 75,
  pais: "Paraguay",
  ciudad: "Asunción",
  titulo: "Depto 2 dorm en Villa Morra",
  descripcion: "Luminoso, a estrenar.",
  amenities: ["pileta"],
};

describe("validatePropertyInput", () => {
  it("accepts a valid input", () => {
    const result = validatePropertyInput(valid);
    expect(result.success).toBe(true);
  });

  it("rejects a negative price", () => {
    const result = validatePropertyInput({ ...valid, precio: -1 });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown tipo", () => {
    const result = validatePropertyInput({ ...valid, tipo: "castillo" });
    expect(result.success).toBe(false);
  });

  it("requires a non-empty titulo", () => {
    const result = validatePropertyInput({ ...valid, titulo: "" });
    expect(result.success).toBe(false);
  });

  it("defaults optional numeric fields to 0/null", () => {
    const result = propertyInputSchema.parse({
      operacion: "alquiler", tipo: "casa", precio: 500, moneda: "PYG",
      pais: "Paraguay", ciudad: "Luque",
      titulo: "Casa", descripcion: "x",
    });
    expect(result.dormitorios).toBe(0);
    expect(result.amenities).toEqual([]);
    expect(result.superficieTerrenoM2).toBeNull();
  });
});
