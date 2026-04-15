"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("http://localhost:3000/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // for http-only cookies
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      { role: "assistant", content: data.response },
    ]);
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-xl font-bold mb-4">AI Coach</h1>

      <div className="flex-1 overflow-y-auto border p-3 rounded">
        {messages.map((m, i) => (
          <div key={i} className="mb-2">
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>

      <div className="flex mt-3 gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your coach..."
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
