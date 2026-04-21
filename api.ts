// lib/api.ts
//
// Token flow:
//   1. FlowFit opens aicoach.cctamcc.site#token=<accessToken>
//   2. page.tsx reads the fragment on mount, calls setAuthToken(), clears the URL
//   3. Every sendMessage() call sends Authorization: Bearer <token>
//   4. Backend authenticate middleware accepts it normally
//
// The token lives in module-level memory only — never written to localStorage
// on this domain, so it is cleared when the tab is closed.

const API = process.env.NEXT_PUBLIC_API_URL ?? "https://fit.cctamcc.site";

// ── In-memory token store ─────────────────────────────────────────────────────
// Module scope = shared across all imports of this file in the same tab session.
let _authToken: string | null = null;

/** Called by page.tsx immediately after reading the URL fragment. */
export function setAuthToken(token: string): void {
  _authToken = token;
}

/** True once a token has been received from the FlowFit handoff. */
export function isTokenSet(): boolean {
  return _authToken !== null;
}

// ── sendMessage ───────────────────────────────────────────────────────────────
export async function sendMessage(message: string): Promise<{ reply: string }> {
  if (!_authToken) {
    // Guard: never fire the request without a token — it will always 401.
    throw new Error(
      "Session not found. Please open AI Coach from your FlowFit dashboard."
    );
  }

  const res = await fetch(`${API}/api/v1/ai/coach`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Backend authenticate middleware requires this header.
      // credentials:'include' alone does NOT satisfy a Bearer-only middleware.
      "Authorization": `Bearer ${_authToken}`,
    },
    // Keep credentials:include so the httpOnly refresh cookie is also sent.
    // This allows the backend to auto-rotate if the access token is close
    // to expiry in future (backend can be updated to do so).
    credentials: "include",
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const body = await res.text();

    // Expired token — tell the user clearly rather than showing a raw 401
    if (res.status === 401) {
      throw new Error(
        "Your session has expired. Please close this tab and reopen AI Coach from FlowFit."
      );
    }

    throw new Error(`Request failed (${res.status}): ${body}`);
  }

  return res.json();
}
