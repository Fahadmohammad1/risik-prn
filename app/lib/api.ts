// ── Backend API client ─────────────────────────────────────────
// Talks to the Express server (risik-prn-server). Auth is a JWT stored in
// localStorage and sent as `Authorization: Bearer <token>`.

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://risik-test-server.vercel.app/api/v1";

const TOKEN_KEY = "risik_token";
const USER_KEY = "risik_user";

export type Role = "super_admin" | "admin" | "researcher" | "officer";

/** Landing dashboard route for each role. */
export function dashboardPath(role: Role): string {
  switch (role) {
    case "super_admin":
      return "/dashboard/super_admin";
    case "admin":
      return "/dashboard/admin";
    case "officer":
      return "/dashboard/officer";
    case "researcher":
      return "/dashboard/researcher";
    default:
      return "/dashboard/super_admin";
  }
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: string;
  image: string | null;
}

// ── Token / user persistence ───────────────────────────────────

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setSession(token: string, user: AuthUser): void {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  // Notify listeners (useSession hook) in the same tab.
  window.dispatchEvent(new Event("risik-auth-change"));
}

export function clearSession(): void {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("risik-auth-change"));
}

// ── Fetch helpers ──────────────────────────────────────────────

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}

async function parseError(res: Response): Promise<ApiError> {
  let message = res.statusText || "Request failed";
  let code: string | undefined;
  try {
    const body = await res.json();
    message = body?.error?.message ?? message;
    code = body?.error?.code;
  } catch {
    /* non-JSON error body */
  }
  return { message, code, status: res.status };
}

/** JSON request returning the unwrapped `data` payload, or throwing ApiError. */
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) throw await parseError(res);
  if (res.status === 204) return undefined as T;

  const body = await res.json();
  return body.data as T;
}

/** Fetch a document's binary content as a Blob (auth header included). */
export async function fetchFileBlob(documentId: string): Promise<Blob> {
  const token = getToken();
  const res = await fetch(`${API_URL}/documents/${documentId}/file`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok) throw await parseError(res);
  return res.blob();
}

// ── Direct-to-Cloudinary upload ────────────────────────────────

export interface UploadSignature {
  timestamp: number;
  signature: string;
  folder: string;
  apiKey: string;
  cloudName: string;
}

export interface DocumentMetadata {
  title: string;
  documentDate?: string;
  state?: string;
  district?: string;
  category?: string;
  documentType?: string;
  notes?: string;
}

/**
 * Upload a file straight from the browser to Cloudinary (using a short-lived
 * signature from our backend), then register its metadata. The file bytes never
 * pass through our server — no request-size limit, no server bandwidth.
 */
export async function uploadDocument(file: File, meta: DocumentMetadata): Promise<void> {
  const sig = await apiFetch<UploadSignature>("/documents/signature", {
    method: "POST",
    body: JSON.stringify({}),
  });

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);

  const cldRes = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/raw/upload`,
    { method: "POST", body: form },
  );
  if (!cldRes.ok) {
    let message = "Upload to storage failed";
    try {
      const body = await cldRes.json();
      message = body?.error?.message ?? message;
    } catch {
      /* non-JSON error */
    }
    throw { message, status: cldRes.status } as ApiError;
  }
  const cld = (await cldRes.json()) as { public_id: string };

  await apiFetch("/documents", {
    method: "POST",
    body: JSON.stringify({
      ...meta,
      publicId: cld.public_id,
      originalName: file.name,
      mimeType: file.type || "application/octet-stream",
    }),
  });
}

/** Direct file URL with the token as a query param (for opening in a new tab). */
export function fileUrl(documentId: string, download = false): string {
  const token = getToken();
  const params = new URLSearchParams();
  if (token) params.set("token", token);
  if (download) params.set("download", "1");
  return `${API_URL}/documents/${documentId}/file?${params.toString()}`;
}
