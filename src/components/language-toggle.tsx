"use client";
import { useRouter } from "next/navigation";
import { useI18n } from "../i18n/client";
import { LOCALE_COOKIE, LOCALES, type Locale } from "../i18n/config";

export function LanguageToggle() {
  const router = useRouter();
  const { locale } = useI18n();

  function setLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  }

  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-xs font-semibold">
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`rounded-full px-2.5 py-1 uppercase transition ${
            l === locale
              ? "bg-orange-600 text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
