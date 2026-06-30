import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Next 16 renamed `middleware` -> `proxy`. Runs before render: refreshes the
// Supabase session cookie and gates /dashboard behind auth.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // Si Supabase no está configurado (p. ej. un preview sin variables de entorno),
  // no gestionamos la sesión: dejamos pasar para que el sitio público igual cargue.
  if (!supabaseUrl || !supabaseKey) {
    return response;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          toSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  // Run on app routes, skip static assets and image optimization.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
