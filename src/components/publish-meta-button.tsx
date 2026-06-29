"use client";
import { useState } from "react";

type State = "idle" | "loading" | "done" | "error";

export function PublishMetaButton({ propertyId }: { propertyId: string }) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function publish() {
    setState("loading");
    setMessage(null);
    try {
      const res = await fetch(`/api/properties/${propertyId}/publish-meta`, {
        method: "POST",
      });
      const body = await res.json();
      if (!res.ok) {
        setState("error");
        setMessage(errorLabel(body.error));
        return;
      }
      setState("done");
      setMessage("Publicado en Facebook e Instagram.");
    } catch {
      setState("error");
      setMessage("Error de red. Intentá de nuevo.");
    }
  }

  return (
    <div className="space-y-1">
      <button
        onClick={publish}
        disabled={state === "loading"}
        className="rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
      >
        {state === "loading" ? "Publicando…" : "Publicar en FB/IG"}
      </button>
      {message && (
        <p
          className={`text-sm ${
            state === "error" ? "text-red-600" : "text-green-700"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}

function errorLabel(code: string): string {
  switch (code) {
    case "no_meta_connection":
      return "Conectá tu página de Facebook primero.";
    case "no_photos":
      return "Subí al menos una foto antes de publicar.";
    default:
      return "No se pudo publicar. Intentá de nuevo.";
  }
}
