"use client";

import { useState, useRef, useEffect } from "react";
import ChatBubble from "@/components/chat/ChatBubble";
import ChatInput from "@/components/chat/ChatInput";
import { sendMessage } from "@/lib/api";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const data = await sendMessage(input);

    setMessages([
      ...newMessages,
      { role: "assistant", content: data.response },
    ]);

    setLoading(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      <div className="p-4 border-b bg-white font-semibold">
        AI Coach
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} content={m.content} />
        ))}

        {loading && <ChatBubble role="assistant" content="..." />}

        <div ref={bottomRef} />
      </div>

      <ChatInput input={input} setInput={setInput} sendMessage={handleSend} />
    </div>
  );
}
