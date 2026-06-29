// Meta Graph API posting via the agency's approved "Botik" app.
// Pure functions over fetch so they can be unit-tested with a mocked fetch.

const GRAPH = "https://graph.facebook.com/v21.0";

export interface PublishResult {
  ok: boolean;
  url?: string;
  error?: string;
}

interface FacebookPageArgs {
  pageId: string;
  accessToken: string;
  caption: string;
  imageUrl: string;
}

interface InstagramArgs {
  igUserId: string;
  accessToken: string;
  caption: string;
  imageUrl: string;
}

async function graphError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: { message?: string } };
    return body.error?.message ?? `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

/**
 * Posts a single photo with a caption to a Facebook Page.
 * POST /{page-id}/photos  →  returns { id, post_id }.
 */
export async function postToFacebookPage(
  args: FacebookPageArgs,
): Promise<PublishResult> {
  const res = await fetch(`${GRAPH}/${args.pageId}/photos`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      url: args.imageUrl,
      caption: args.caption,
      access_token: args.accessToken,
    }),
  });

  if (!res.ok) return { ok: false, error: await graphError(res) };

  const body = (await res.json()) as { post_id?: string; id?: string };
  const id = body.post_id ?? body.id;
  return {
    ok: true,
    url: id ? `https://www.facebook.com/${id}` : undefined,
  };
}

/**
 * Publishes a single image to an Instagram Business account. Two steps:
 *   1. POST /{ig-user-id}/media           → creation_id (container)
 *   2. POST /{ig-user-id}/media_publish   → published media id
 * The image must be reachable at a public URL (a Supabase signed URL works).
 */
export async function publishToInstagram(
  args: InstagramArgs,
): Promise<PublishResult> {
  const createRes = await fetch(`${GRAPH}/${args.igUserId}/media`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      image_url: args.imageUrl,
      caption: args.caption,
      access_token: args.accessToken,
    }),
  });

  if (!createRes.ok) return { ok: false, error: await graphError(createRes) };

  const { id: creationId } = (await createRes.json()) as { id?: string };
  if (!creationId) return { ok: false, error: "No creation_id returned" };

  const publishRes = await fetch(`${GRAPH}/${args.igUserId}/media_publish`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      creation_id: creationId,
      access_token: args.accessToken,
    }),
  });

  if (!publishRes.ok) return { ok: false, error: await graphError(publishRes) };

  const { id } = (await publishRes.json()) as { id?: string };
  return {
    ok: true,
    url: id ? `https://www.instagram.com/p/${id}` : undefined,
  };
}
