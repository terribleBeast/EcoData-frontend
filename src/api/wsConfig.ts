export function buildAnalyzerWsUrl(genusId: string, token?: string): string {
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1";

  const url = new URL(apiBaseUrl);

  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = `/api/v1/analyzer/ws/${genusId}`;

  if (token) {
    url.searchParams.set("token", token);
  }

  return url.toString();
}
