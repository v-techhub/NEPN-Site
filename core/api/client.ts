const BASE_URL = "/api/cms";
const DOMAIN =
  process.env.NEXT_PUBLIC_CMS_ASSET_URL ?? "https://cms.networkeandp.com";

export type QueryValue = string | number | boolean | null | undefined;

export interface ApiFetchOptions extends RequestInit {
  query?: Record<string, QueryValue>;
}

/**
 * Prepends the main CMS domain to a relative image path if necessary.
 */
export function getImageUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${DOMAIN}${cleanPath}`;
}

/**
 * Standard fetch wrapper for CMS API communication
 */
export async function apiFetch<T>(
  endpoint: string,
  options?: ApiFetchOptions
): Promise<T> {
  const searchParams = new URLSearchParams();
  searchParams.set("path", endpoint);

  if (options?.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        return;
      }

      searchParams.set(key, String(value));
    });
  }

  const url = `${BASE_URL}?${searchParams.toString()}`;

  const headers = new Headers(options?.headers);

  // Set JSON headers by default unless uploading files (FormData)
  if (!headers.has("Content-Type") && !(options?.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Future-proofing: attach Authorization token if user is logged in
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("nepn_cms_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMsg = `HTTP Error ${response.status}: ${response.statusText}`;
    try {
      const errorJson = await response.json();
      errorMsg = errorJson.message || errorMsg;
    } catch {
      // response body was not JSON
    }
    throw new Error(errorMsg);
  }

  // For DELETE/POST endpoints that return 204 or empty bodies
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}
