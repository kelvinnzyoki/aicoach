export async function sendMessage(message: string) {
  const res = await fetch("http://localhost:3000/ai/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ message }),
  });

  return res.json();
}
