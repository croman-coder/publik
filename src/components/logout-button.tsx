"use client";
import { useRouter } from "next/navigation";
import { createClient } from "../lib/supabase/client";
import { useI18n } from "../i18n/client";

export function LogoutButton() {
  const router = useRouter();
  const { dict } = useI18n();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="text-sm font-medium text-slate-600 hover:text-slate-900"
    >
      {dict.dashboard.signOut}
    </button>
  );
}
