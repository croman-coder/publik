"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (error) {
      setError("We couldn't send the link. Check your email and try again.");
      return;
    }
    setSent(true);
  }

  return (
    <main className="min-h-dvh grid lg:grid-cols-2">
      {/* Brand panel */}
      <section className="relative hidden lg:flex flex-col justify-between bg-orange-600 text-white p-12 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-500/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-orange-700/40 blur-3xl"
        />
        <Link href="/" className="relative text-2xl font-bold tracking-tight">
          PUBLIK
        </Link>
        <div className="relative space-y-6 max-w-md">
          <h2 className="text-4xl font-bold leading-tight">
            Publish to every portal from one place.
          </h2>
          <p className="text-orange-50/90 text-lg">
            Infocasas, Facebook, Marketplace and Instagram. Load a property once
            and PUBLIK publishes it everywhere.
          </p>
          <ul className="space-y-3 text-orange-50">
            {[
              "One upload, every portal",
              "Photos and data in sync",
              "Live publishing status",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 flex-none"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 0 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-orange-50/70">
          Built for real estate agents in Paraguay.
        </p>
      </section>

      {/* Form panel */}
      <section className="flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 text-2xl font-bold tracking-tight text-orange-600">
            PUBLIK
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m3 7 9 6 9-6M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-slate-900">
                Check your email
              </h1>
              <p className="text-slate-600">
                We sent a sign-in link to{" "}
                <span className="font-medium text-slate-900">{email}</span>. Open
                it on this device to get in.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-slate-900">
                Sign in to your account
              </h1>
              <p className="mt-2 text-slate-600">
                We'll email you a magic link. No passwords.
              </p>
              <form onSubmit={signIn} className="mt-8 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                  />
                </div>
                {error && (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center rounded-lg bg-orange-600 px-4 py-2.5 font-semibold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500/40 disabled:opacity-60"
                >
                  {loading ? "Sending…" : "Sign in"}
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-slate-500">
                Want to see plans and pricing?{" "}
                <Link
                  href="/"
                  className="font-medium text-orange-600 hover:text-orange-700"
                >
                  Discover PUBLIK
                </Link>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
