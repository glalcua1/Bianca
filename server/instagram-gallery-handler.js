import https from "https";

const IG_APP_ID = "936619743392459";
const IG_USER_AGENT = "Instagram 219.0.0.12.117 Android";

/**
 * Node fetch sends Sec-Fetch-* headers Instagram rejects; use https directly.
 * @param {string} url
 * @param {Record<string, string>} [headers]
 */
function httpsGetText(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        let raw = "";
        res.on("data", (chunk) => {
          raw += chunk;
        });
        res.on("end", () => {
          resolve({ status: res.statusCode ?? 0, body: raw });
        });
      })
      .on("error", reject);
  });
}

const RESERVED_SEGMENTS = new Set([
  "p",
  "reel",
  "reels",
  "stories",
  "explore",
  "accounts",
  "about",
  "legal",
  "directory",
]);

/** @param {string | undefined} profileUrl */
export function parseInstagramUsername(profileUrl) {
  const fallback = "bianca.diamonds";
  if (!profileUrl || typeof profileUrl !== "string") return fallback;

  const trimmed = profileUrl.trim();
  if (!trimmed) return fallback;

  if (!trimmed.includes("instagram.com")) {
    return trimmed.replace(/^@/, "") || fallback;
  }

  try {
    const { pathname } = new URL(trimmed);
    const segment = pathname.split("/").filter(Boolean)[0];
    if (!segment || RESERVED_SEGMENTS.has(segment.toLowerCase())) {
      return fallback;
    }
    return segment;
  } catch {
    return fallback;
  }
}

/**
 * @param {{ shortcode: string, is_video?: boolean, product_type?: string, display_url?: string, thumbnail_src?: string }} node
 */
function nodeToMediaItem(node) {
  const isReel =
    Boolean(node.is_video) &&
    (node.product_type === "clips" || node.product_type === "reels");
  const path = isReel ? "reel" : "p";

  return {
    id: node.shortcode,
    media_type: node.is_video ? "VIDEO" : "IMAGE",
    media_url: node.display_url,
    thumbnail_url: node.thumbnail_src,
    permalink: `https://www.instagram.com/${path}/${node.shortcode}/`,
  };
}

/**
 * Public profile timeline via Instagram web API (no access token).
 * @param {string} username
 * @param {number} [limit]
 */
export async function fetchInstagramGallery(username, limit = 12) {
  const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(
    username
  )}`;

  const { status, body } = await httpsGetText(url, {
    "User-Agent": IG_USER_AGENT,
    "X-IG-App-ID": IG_APP_ID,
  });

  if (status < 200 || status >= 300) {
    throw new Error(`profile_fetch_failed:${status}`);
  }

  const payload = JSON.parse(body);
  const edges =
    payload?.data?.user?.edge_owner_to_timeline_media?.edges ?? [];

  return edges
    .slice(0, limit)
    .map((edge) => nodeToMediaItem(edge.node))
    .filter((item) => item.thumbnail_url || item.media_url);
}

/**
 * @param {string} postUrl
 */
export async function resolveInstagramPostUrl(postUrl) {
  const { status, body: html } = await httpsGetText(postUrl, {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  });

  if (status < 200 || status >= 300) {
    throw new Error(`post_fetch_failed:${status}`);
  }
  const imageMatch = html.match(
    /property="og:image"\s+content="([^"]+)"/i
  );
  const titleMatch = html.match(
    /property="og:title"\s+content="([^"]+)"/i
  );

  const thumbnail_url = imageMatch?.[1]?.replace(/&amp;/g, "&");
  if (!thumbnail_url) {
    throw new Error("og_image_not_found");
  }

  const permalink = postUrl.split("?")[0];
  const shortcode =
    permalink.match(/\/(p|reel|reels)\/([^/]+)/i)?.[2] ?? permalink;

  return {
    id: shortcode,
    media_type: /\/reel/i.test(permalink) ? "VIDEO" : "IMAGE",
    media_url: thumbnail_url,
    thumbnail_url,
    permalink,
    caption: titleMatch?.[1],
  };
}

/** @param {Record<string, string | string[] | undefined>} query */
export async function handleInstagramFeedRequest(query = {}) {
  const limit = Math.min(
    24,
    Math.max(1, Number.parseInt(String(query.limit ?? "12"), 10) || 12)
  );
  const username = parseInstagramUsername(query.username);

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (token) {
    const graphMedia = await fetchGraphMedia(token, limit);
    if (graphMedia.length > 0) {
      return {
        status: 200,
        body: { media: graphMedia, configured: true, source: "graph" },
      };
    }
  }

  try {
    const media = await fetchInstagramGallery(username, limit);
    if (media.length > 0) {
      return {
        status: 200,
        body: { media, configured: Boolean(token), source: "profile" },
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "profile_error";
    return {
      status: 200,
      body: {
        media: [],
        configured: Boolean(token),
        source: "profile",
        error: message,
      },
    };
  }

  return {
    status: 200,
    body: { media: [], configured: Boolean(token), source: "none" },
  };
}

/**
 * @param {string} token
 * @param {number} limit
 */
async function fetchGraphMedia(token, limit) {
  const graphVersion = process.env.INSTAGRAM_GRAPH_VERSION || "v21.0";
  const userId = process.env.INSTAGRAM_USER_ID || "me";
  const fbIgUserId = process.env.INSTAGRAM_FACEBOOK_GRAPH_USER_ID;
  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "permalink",
    "thumbnail_url",
    "children{media_url,media_type}",
  ].join(",");

  const q = `fields=${encodeURIComponent(fields)}&limit=${limit}&access_token=${encodeURIComponent(
    token
  )}`;

  const url = fbIgUserId
    ? `https://graph.facebook.com/${graphVersion}/${fbIgUserId}/media?${q}`
    : `https://graph.instagram.com/${userId}/media?${q}`;

  const { status, body } = await httpsGetText(url);
  if (status < 200 || status >= 300) return [];
  const data = JSON.parse(body);
  return data.data ?? [];
}
