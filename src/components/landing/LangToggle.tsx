"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/client";
import { LOCALE_COOKIE, LOCALES, type Locale } from "@/i18n/config";
import { cn } from "./cn";

export function LangToggle() {
  const router = useRouter();
  const { locale } = useI18n();

  function setLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  }

  return (
    <div className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] p-0.5 text-xs font-semibold backdrop-blur-sm">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={l === locale}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition",
            l === locale ? "bg-accent text-[#1f0d04]" : "text-white/55 hover:text-white",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
