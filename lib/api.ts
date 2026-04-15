export async function sendMessage(message: string) {
  const API = "https://fit.cctamcc.site";
  // Assign the fetch result to 'res' and await it
  const res = await fetch(`${API}/ai/chat`, {
    method: "POST", // Ensure the method matches your backend
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    credentials: "include"
  });
  return res.json();
}
