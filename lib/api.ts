const API = process.env.NEXT_PUBLIC_API_URL ?? "https://fit.cctamcc.site";

export async function sendMessage(message: string): Promise<{ reply: string }> {
  const res = await fetch(`${API}/api/coach`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }

  return res.json();
}
