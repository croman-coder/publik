"use client";
import { useState } from "react";
import { useI18n } from "../i18n/client";
import type { Dictionary } from "../i18n/dictionaries";

type State = "idle" | "loading" | "done" | "error";

export function PublishMetaButton({ propertyId }: { propertyId: string }) {
  const { dict } = useI18n();
  const t = dict.publish;
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
        setMessage(errorLabel(body.error, t));
        return;
      }
      setState("done");
      setMessage(t.success);
    } catch {
      setState("error");
      setMessage(t.networkError);
    }
  }

  return (
    <div className="space-y-1">
      <button
        onClick={publish}
        disabled={state === "loading"}
        className="rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
      >
        {state === "loading" ? t.publishing : t.idle}
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

function errorLabel(code: string, t: Dictionary["publish"]): string {
  switch (code) {
    case "no_meta_connection":
      return t.noConnection;
    case "no_photos":
      return t.noPhotos;
    default:
      return t.genericError;
  }
}
