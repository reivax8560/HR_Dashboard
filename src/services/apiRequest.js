export default async function apiRequest(url, options) {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof payload?.error === "string" && payload.error
        ? payload.error
        : `${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  return payload;
}
