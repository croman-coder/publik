"use client";
import { useState } from "react";
import {
  validatePropertyInput,
  type PropertyInput,
} from "../domain/property-schema";
import { OPERACIONES, TIPOS, MONEDAS } from "../domain/property";

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
      setError("Revisá los campos obligatorios.");
      return;
    }
    setError(null);
    onSubmit(result.data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
      <label className="block">
        Título
        <input name="titulo" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">
        Descripción
        <textarea name="descripcion" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">
        Precio
        <input name="precio" type="number" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">
        Moneda
        <select name="moneda" className="w-full border rounded px-2 py-1">
          {MONEDAS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label className="block">
        Operación
        <select name="operacion" className="w-full border rounded px-2 py-1">
          {OPERACIONES.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
      <label className="block">
        Tipo
        <select name="tipo" className="w-full border rounded px-2 py-1">
          {TIPOS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-3 gap-2">
        <label>
          Dormitorios
          <input name="dormitorios" type="number" className="w-full border rounded px-2 py-1" />
        </label>
        <label>
          Baños
          <input name="banos" type="number" className="w-full border rounded px-2 py-1" />
        </label>
        <label>
          Cocheras
          <input name="cocheras" type="number" className="w-full border rounded px-2 py-1" />
        </label>
      </div>
      <label className="block">
        Sup. construida (m²)
        <input name="superficieConstruidaM2" type="number" className="w-full border rounded px-2 py-1" />
      </label>
      <label className="block">
        Ciudad
        <input name="ciudad" className="w-full border rounded px-2 py-1" />
      </label>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button className="bg-orange-600 text-white rounded px-4 py-2">
        Guardar
      </button>
    </form>
  );
}
