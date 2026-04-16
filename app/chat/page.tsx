"use client";

import { useState, useRef, useEffect } from "react";
import ChatBubble from "@/components/chat/ChatBubble";
import ChatInput from "@/components/chat/ChatInput";
import { sendMessage } from "@/lib/api";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input.trim() };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const data = await sendMessage(userMessage.content);
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError("Could not reach the coach. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 border-b bg-white font-semibold text-lg">
        AI Coach
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !loading && (
          <p className="text-center text-gray-400 text-sm mt-8">
            Ask your coach anything to get started.
          </p>
        )}

        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} content={m.content} />
        ))}

        {loading && <ChatBubble role="assistant" content="..." />}

        {error && (
          <p className="text-center text-red-500 text-sm">{error}</p>
        )}

        <div ref={bottomRef} />
      </div>

      <ChatInput input={input} setInput={setInput} sendMessage={handleSend} />
    </div>
  );
}
