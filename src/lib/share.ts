export async function shareOrCopy(payload: {
  title: string;
  text: string;
  url?: string;
}): Promise<"shared" | "copied" | "cancelled"> {
  const url = payload.url ?? (typeof window !== "undefined" ? window.location.href : "");
  const text = payload.text;
  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({ title: payload.title, text, url });
      return "shared";
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return "cancelled";
    }
  }
  const packed = url ? `${text}\n${url}` : text;
  await navigator.clipboard.writeText(packed);
  return "copied";
}

export function withParams(params: Record<string, string | number>): string {
  if (typeof window === "undefined") return "/";
  const url = new URL(window.location.href);
  url.hash = "";
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  return url.toString();
}

export function queryNumber(key: string, fallback: number): number {
  if (typeof window === "undefined") return fallback;
  const raw = new URLSearchParams(window.location.search).get(key);
  if (raw == null || raw === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

export function queryString(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return new URLSearchParams(window.location.search).get(key) ?? fallback;
}
