// Shared by the Vercel Functions in api/. Files and folders starting with "_"
// are not routed by Vercel, so this helper is never exposed as an endpoint.

// Replaces Astro's `security.checkOrigin` (lost with the adapter): only the
// production site, Vercel previews and local dev may call these endpoints.
// Origin is preferred; Referer is the fallback. Neither present => rejected.
export function isAllowedOrigin(request: Request): boolean {
  const raw = request.headers.get("origin") || request.headers.get("referer");
  if (!raw) return false;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  const { protocol, hostname } = url;
  if (protocol === "https:") {
    return (
      hostname === "www.liammarega.com" ||
      hostname === "liammarega.com" ||
      hostname.endsWith(".vercel.app")
    );
  }
  if (protocol === "http:") {
    return hostname === "localhost" || hostname === "127.0.0.1";
  }
  return false;
}
