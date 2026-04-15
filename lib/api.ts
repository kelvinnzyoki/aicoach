export async function sendMessage(message: string) {
  const API = "https://fit.cctamcc.site";

fetch(`${API}/ai/chat`, {
  credentials: "include"
});

  return res.json();
}
