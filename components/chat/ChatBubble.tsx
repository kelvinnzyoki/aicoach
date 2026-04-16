import React from "react";

interface ChatBubbleProps {
  role: string;
  content: string;
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap break-words ${
          isUser ? "bg-black text-white" : "bg-white border"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
