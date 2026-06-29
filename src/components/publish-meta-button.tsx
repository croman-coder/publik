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
      setMessage("Published to Facebook and Instagram.");
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="space-y-1">
      <button
        onClick={publish}
        disabled={state === "loading"}
        className="rounded-lg bg-orange-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
      >
        {state === "loading" ? "Publishing…" : "Publish to FB/IG"}
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
      return "Connect your Facebook page first.";
    case "no_photos":
      return "Upload at least one photo before publishing.";
    default:
      return "Couldn't publish. Please try again.";
  }
}
