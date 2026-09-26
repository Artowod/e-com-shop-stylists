const LOCAL_SITE_URL = "http://localhost:3000";

export function getSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL) {
  const configuredUrl = value?.trim();

  if (!configuredUrl) return LOCAL_SITE_URL;

  const hasProtocol = /^https?:\/\//i.test(configuredUrl);
  const isLocal = /^(localhost|127\.0\.0\.1)(:|\/|$)/i.test(configuredUrl);
  const candidate = hasProtocol ? configuredUrl : `${isLocal ? "http" : "https"}://${configuredUrl}`;

  try {
    return new URL(candidate).origin;
  } catch {
    return LOCAL_SITE_URL;
  }
}
