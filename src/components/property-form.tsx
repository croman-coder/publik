"use client";
import { useState } from "react";
import {
  validatePropertyInput,
  type PropertyInput,
} from "../domain/property-schema";
import {
  OPERACIONES,
  TIPOS,
  MONEDAS,
  type Operacion,
  type Tipo,
} from "../domain/property";

const OPERACION_LABEL: Record<Operacion, string> = {
  venta: "Sale",
  alquiler: "Rent",
  alquiler_temporal: "Short-term rent",
};

const TIPO_LABEL: Record<Tipo, string> = {
  casa: "House",
  departamento: "Apartment",
  terreno: "Land",
  local: "Retail space",
  oficina: "Office",
  deposito: "Warehouse",
};

export function PropertyForm({
  onSubmit,
}: {
  onSubmit: (p: PropertyInput) => void;
}) {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const num = (k: string) => (f.get(k) ? Number(f.get(k)) : undefined);
    const raw = {
      operacion: f.get("operacion"),
      tipo: f.get("tipo"),
      precio: num("precio"),
      moneda: f.get("moneda"),
      dormitorios: num("dormitorios"),
      banos: num("banos"),
      cocheras: num("cocheras"),
      superficieConstruidaM2: num("superficieConstruidaM2") ?? null,
      pais: f.get("pais") || "Paraguay",
      ciudad: f.get("ciudad"),
      titulo: f.get("titulo"),
      descripcion: f.get("descripcion"),
    };
    const result = validatePropertyInput(raw);
    if (!result.success) {
      setError("Please fill in the required fields.");
      return;
    }
    setError(null);
    onSubmit(result.data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
      <label className="block">
        Title
        <input name="titulo" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">
        Description
        <textarea name="descripcion" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">
        Price
        <input name="precio" type="number" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">
        Currency
        <select name="moneda" className="w-full border rounded px-2 py-1">
          {MONEDAS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label className="block">
        Operation
        <select name="operacion" className="w-full border rounded px-2 py-1">
          {OPERACIONES.map((o) => (
            <option key={o} value={o}>
              {OPERACION_LABEL[o]}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        Type
        <select name="tipo" className="w-full border rounded px-2 py-1">
          {TIPOS.map((t) => (
            <option key={t} value={t}>
              {TIPO_LABEL[t]}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-3 gap-2">
        <label>
          Bedrooms
          <input name="dormitorios" type="number" className="w-full border rounded px-2 py-1" />
        </label>
        <label>
          Bathrooms
          <input name="banos" type="number" className="w-full border rounded px-2 py-1" />
        </label>
        <label>
          Parking
          <input name="cocheras" type="number" className="w-full border rounded px-2 py-1" />
        </label>
      </div>
      <label className="block">
        Built area (m²)
        <input name="superficieConstruidaM2" type="number" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">
        City
        <input name="ciudad" className="w-full border rounded px-2 py-1" />
      </label>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button className="bg-orange-600 text-white rounded px-4 py-2">
        Save
      </button>
    </form>
  );
}
