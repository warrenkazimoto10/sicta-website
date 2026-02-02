const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001")
  .replace(/\/$/, "");

type RequestOptions = RequestInit & {
  auth?: boolean;
  json?: unknown;
};

export interface ApiResponse<T = unknown> {
  status: "success" | "error";
  data?: T;
  meta?: Record<string, unknown>;
  message?: string;
  errors?: Record<string, unknown>;
}

export async function apiRequest<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
  const { auth = true, json, ...init } = options;
  const headers = new Headers(init.headers ?? {});

  if (json !== undefined) {
    if (!(json instanceof FormData)) {
      headers.set("Content-Type", "application/json");
      init.body = JSON.stringify(json);
    }
  }

  if (auth) {
    const token = localStorage.getItem("espacePro_token");
    if (!token) {
      throw new Error("Utilisateur non authentifié");
    }
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...init,
    headers,
  });

  if (response.status === 204) {
    return { status: "success" };
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok || payload?.status === "error") {
    const message = payload?.message || `Erreur API (${response.status})`;
    throw new Error(message);
  }

  return payload as ApiResponse<T>;
}

export function getApiBaseUrl(): string {
  return API_BASE_URL;
}
