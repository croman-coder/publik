import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { postToFacebookPage, publishToInstagram } from "./publish";

function jsonResponse(body: unknown, ok = true, status = 200): Response {
  return {
    ok,
    status,
    json: async () => body,
  } as Response;
}

describe("postToFacebookPage", () => {
  beforeEach(() => vi.restoreAllMocks());
  afterEach(() => vi.restoreAllMocks());

  it("posts the photo and returns the post url", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(jsonResponse({ id: "1", post_id: "10_20" }));

    const r = await postToFacebookPage({
      pageId: "10",
      accessToken: "tok",
      caption: "hola",
      imageUrl: "https://img/1.jpg",
    });

    expect(r.ok).toBe(true);
    expect(r.url).toBe("https://www.facebook.com/10_20");
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/10/photos");
    expect(JSON.parse((init as RequestInit).body as string)).toMatchObject({
      url: "https://img/1.jpg",
      caption: "hola",
      access_token: "tok",
    });
  });

  it("returns the graph error message on failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      jsonResponse({ error: { message: "Invalid token" } }, false, 400),
    );

    const r = await postToFacebookPage({
      pageId: "10",
      accessToken: "bad",
      caption: "x",
      imageUrl: "https://img/1.jpg",
    });

    expect(r.ok).toBe(false);
    expect(r.error).toBe("Invalid token");
  });
});

describe("publishToInstagram", () => {
  beforeEach(() => vi.restoreAllMocks());
  afterEach(() => vi.restoreAllMocks());

  it("creates a container then publishes it", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(jsonResponse({ id: "container1" }))
      .mockResolvedValueOnce(jsonResponse({ id: "media9" }));

    const r = await publishToInstagram({
      igUserId: "99",
      accessToken: "tok",
      caption: "hola",
      imageUrl: "https://img/1.jpg",
    });

    expect(r.ok).toBe(true);
    expect(r.url).toBe("https://www.instagram.com/p/media9");
    expect(String(fetchMock.mock.calls[0][0])).toContain("/99/media");
    expect(String(fetchMock.mock.calls[1][0])).toContain("/99/media_publish");
    expect(
      JSON.parse((fetchMock.mock.calls[1][1] as RequestInit).body as string),
    ).toMatchObject({ creation_id: "container1", access_token: "tok" });
  });

  it("fails fast if container creation fails", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        jsonResponse({ error: { message: "bad image" } }, false, 400),
      );

    const r = await publishToInstagram({
      igUserId: "99",
      accessToken: "tok",
      caption: "x",
      imageUrl: "https://img/1.jpg",
    });

    expect(r.ok).toBe(false);
    expect(r.error).toBe("bad image");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
