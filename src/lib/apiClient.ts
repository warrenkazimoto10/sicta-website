const BASE_URL = import.meta.env.VITE_API_URL ?? "https://sicta.cieria-app.com/api/v1";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, signal } = options;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      json?.message ??
      (json?.errors ? Object.values(json.errors as Record<string, string[]>).flat().join(" ") : "Erreur réseau");
    throw new Error(message);
  }

  return json as T;
}

export const apiClient = {
  get: <T>(path: string, signal?: AbortSignal) =>
    request<T>(path, { method: "GET", signal }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body }),
};
