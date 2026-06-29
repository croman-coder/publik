import { describe, it, expect } from "vitest";
import { buildCaption } from "./caption";
import type { Property } from "./property";

const base: Property = {
  id: "p1",
  agencyId: "a1",
  agentId: "u1",
  operacion: "venta",
  tipo: "casa",
  precio: 120000,
  moneda: "USD",
  dormitorios: 3,
  banos: 2,
  cocheras: 1,
  superficieTerrenoM2: 360,
  superficieConstruidaM2: 180,
  pais: "Paraguay",
  ciudad: "Asunción",
  barrio: "Mburucuyá",
  direccion: null,
  lat: null,
  lng: null,
  titulo: "Casa a estrenar",
  descripcion: "Hermosa casa con patio.",
  amenities: ["pileta", "quincho"],
  estado: "borrador",
};

describe("buildCaption", () => {
  it("leads with title and agent description", () => {
    const c = buildCaption(base);
    expect(c.startsWith("Casa a estrenar")).toBe(true);
    expect(c).toContain("Hermosa casa con patio.");
  });

  it("includes operation, type and formatted price", () => {
    const c = buildCaption(base);
    expect(c).toContain("Venta · Casa");
    expect(c).toContain("USD 120.000");
  });

  it("formats PYG prices with Gs. prefix", () => {
    const c = buildCaption({ ...base, moneda: "PYG", precio: 1500000 });
    expect(c).toContain("Gs. 1.500.000");
  });

  it("lists specs and omits zero values", () => {
    const c = buildCaption({ ...base, cocheras: 0 });
    expect(c).toContain("3 dorm.");
    expect(c).toContain("2 baños");
    expect(c).not.toContain("cocheras");
  });

  it("includes location and amenities", () => {
    const c = buildCaption(base);
    expect(c).toContain("Mburucuyá, Asunción");
    expect(c).toContain("pileta · quincho");
  });
});
