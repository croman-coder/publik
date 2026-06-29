import Link from "next/link";
import { LogoutButton } from "../../components/logout-button";
import { LanguageToggle } from "../../components/language-toggle";
import { getServerDictionary } from "../../i18n/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { dict } = await getServerDictionary();
  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="text-xl font-bold text-orange-600">
            PUBLIK
          </Link>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Link
              href="/dashboard/properties/new"
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              {dict.dashboard.newProperty}
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
    </div>
  );
}
