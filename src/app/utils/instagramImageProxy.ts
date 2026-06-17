/** Serve Instagram CDN images through our API (avoids hotlink blocks in the browser). */
export function proxyInstagramImageUrl(cdnUrl: string): string {
  return `/api/instagram-media?url=${encodeURIComponent(cdnUrl)}`;
}
