import https from "https";

const ALLOWED_HOST_SUFFIX = "cdninstagram.com";

/** @param {string} rawUrl */
export function isAllowedInstagramCdnUrl(rawUrl) {
  try {
    const { hostname, protocol } = new URL(rawUrl);
    return (
      protocol === "https:" &&
      (hostname === ALLOWED_HOST_SUFFIX ||
        hostname.endsWith(`.${ALLOWED_HOST_SUFFIX}`))
    );
  } catch {
    return false;
  }
}

/** @param {string} url */
function httpsGetStream(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          httpsGetStream(res.headers.location).then(resolve).catch(reject);
          return;
        }
        resolve(res);
      })
      .on("error", reject);
  });
}

/** @param {Record<string, string | string[] | undefined>} query */
export async function handleInstagramMediaProxyRequest(query) {
  const raw = query.url;
  const url = Array.isArray(raw) ? raw[0] : raw;

  if (!url || !isAllowedInstagramCdnUrl(url)) {
    return { status: 400, body: null, contentType: "text/plain" };
  }

  try {
    const upstream = await httpsGetStream(url);
    if (!upstream.statusCode || upstream.statusCode < 200 || upstream.statusCode >= 300) {
      return { status: upstream.statusCode || 502, body: null, contentType: "text/plain" };
    }

    const body = await new Promise((resolve, reject) => {
      const chunks = [];
      upstream.on("data", (chunk) => chunks.push(chunk));
      upstream.on("end", () => resolve(Buffer.concat(chunks)));
      upstream.on("error", reject);
    });

    return {
      status: 200,
      body,
      contentType: upstream.headers["content-type"] || "image/jpeg",
      cacheControl: "public, max-age=3600",
    };
  } catch {
    return { status: 502, body: null, contentType: "text/plain" };
  }
}
