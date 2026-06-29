"use client";
import { useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    await supabase.auth.signInWithOtp({ email });
    setSent(true);
  }

  return (
    <main className="max-w-sm mx-auto mt-24 p-6">
      <h1 className="text-2xl font-semibold mb-4">PUBLIK</h1>
      {sent ? (
        <p>Revisá tu email para el enlace de acceso.</p>
      ) : (
        <form onSubmit={signIn} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full border rounded px-3 py-2"
          />
          <button className="w-full bg-orange-600 text-white rounded py-2">
            Ingresar
          </button>
        </form>
      )}
    </main>
  );
}
