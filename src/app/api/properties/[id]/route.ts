import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const { data: property, error } = await supabase
    .from("properties")
    .select("*, photos(storage_url, orden)")
    .eq("id", id)
    .single();

  if (error || !property) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // Sign photo URLs so the extension can fetch them.
  const photos = await Promise.all(
    (property.photos ?? [])
      .sort(
        (a: { orden: number }, b: { orden: number }) => a.orden - b.orden,
      )
      .map(async (ph: { storage_url: string; orden: number }) => {
        const { data } = await supabase.storage
          .from("property-photos")
          .createSignedUrl(ph.storage_url, 3600);
        return { url: data?.signedUrl ?? null, orden: ph.orden };
      }),
  );

  return NextResponse.json({ property, photos });
}
