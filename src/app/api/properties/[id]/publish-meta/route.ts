import { NextResponse } from "next/server";
import { createClient } from "../../../../../lib/supabase/server";
import { createAdminClient } from "../../../../../lib/supabase/admin";
import { rowToProperty, type PropertyRow } from "../../../../../domain/property-row";
import { buildCaption } from "../../../../../domain/caption";
import {
  postToFacebookPage,
  publishToInstagram,
  type PublishResult,
} from "../../../../../lib/meta/publish";
import type { Portal } from "../../../../../domain/property";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  // RLS scopes this to the agent's own agency.
  const { data: row, error } = await supabase
    .from("properties")
    .select("*, photos(storage_url, orden)")
    .eq("id", id)
    .single();

  if (error || !row) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const photos = (row.photos ?? []) as { storage_url: string; orden: number }[];
  if (photos.length === 0) {
    return NextResponse.json({ error: "no_photos" }, { status: 400 });
  }
  const firstPhoto = [...photos].sort((a, b) => a.orden - b.orden)[0];

  // Public-enough URL for Meta to fetch the image.
  const { data: signed } = await supabase.storage
    .from("property-photos")
    .createSignedUrl(firstPhoto.storage_url, 3600);
  if (!signed?.signedUrl) {
    return NextResponse.json({ error: "photo_url_failed" }, { status: 500 });
  }

  const admin = createAdminClient();
  const { data: conn } = await admin
    .from("meta_connections")
    .select("page_id, page_access_token, ig_user_id")
    .eq("agency_id", row.agency_id)
    .single();

  if (!conn) {
    return NextResponse.json({ error: "no_meta_connection" }, { status: 400 });
  }

  const property = rowToProperty(row as PropertyRow);
  const caption = buildCaption(property);
  const imageUrl = signed.signedUrl;

  const results: Partial<Record<Portal, PublishResult>> = {};

  results.fb_page = await postToFacebookPage({
    pageId: conn.page_id,
    accessToken: conn.page_access_token,
    caption,
    imageUrl,
  });

  if (conn.ig_user_id) {
    results.instagram = await publishToInstagram({
      igUserId: conn.ig_user_id,
      accessToken: conn.page_access_token,
      caption,
      imageUrl,
    });
  }

  // Persist per-portal publication state.
  const rows = (Object.entries(results) as [Portal, PublishResult][]).map(
    ([portal, r]) => ({
      property_id: id,
      portal,
      estado: r.ok ? "publicada" : "error",
      url_publicada: r.url ?? null,
      error_msg: r.error ?? null,
      fecha: new Date().toISOString(),
    }),
  );

  await admin
    .from("portal_publications")
    .upsert(rows, { onConflict: "property_id,portal" });

  return NextResponse.json({ results });
}
