"use client";

// app/chat/page.tsx  (or wherever your chat route lives)
//
// Token handoff:
//   FlowFit opens this page as: https://aicoach.cctamcc.site#token=<accessToken>
//   On mount we read the fragment, pass it to the api module, then immediately
//   replace the URL to remove the token from the address bar — it should never
//   be visible or bookmarkable after that first read.

import { useState, useRef, useEffect } from "react";
import ChatBubble from "@/components/chat/ChatBubble";
import ChatInput  from "@/components/chat/ChatInput";
import { sendMessage, setAuthToken, isTokenSet } from "@/lib/api";

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  // true once we've confirmed a token is available
  const [ready,    setReady]    = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // ── Token extraction — runs once on mount ──────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash  = window.location.hash; // e.g. "#token=eyJhbGci..."
    const match = hash.match(/[#&]token=([^&]+)/);

    if (match) {
      const token = decodeURIComponent(match[1]);

      // Hand token to the api module (stored in memory, never in localStorage)
      setAuthToken(token);

      // Immediately scrub the token from the address bar.
      // replaceState so it doesn't create a back-history entry with the token.
      window.history.replaceState(null, "", window.location.pathname);
    }

    // Mark ready regardless — if no token, sendMessage() will throw a
    // user-friendly error on the first attempt.
    setReady(true);
  }, []);

  // ── Send message ───────────────────────────────────────────────────────────
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
    } catch (err: any) {
      console.error("[ChatPage] sendMessage error:", err);
      setError(err.message ?? "Could not reach the coach. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Auto-scroll ────────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── No-token warning (shown when page is opened directly, not from FlowFit) ─
  const noTokenWarning = ready && !isTokenSet();

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b bg-white font-semibold text-lg">
        AI Coach
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {noTokenWarning && (
          <div className="mx-auto max-w-sm mt-8 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-center text-sm text-yellow-800">
            <p className="font-semibold mb-1">Session not found</p>
            <p>
              Please open AI Coach from your{" "}
              <a
                href="https://flowfit.app/dashboard"
                className="underline font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                FlowFit dashboard
              </a>{" "}
              to authenticate.
            </p>
          </div>
        )}

        {messages.length === 0 && !loading && !noTokenWarning && (
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

      {/* Input — disabled until token is present */}
      <ChatInput
        input={input}
        setInput={setInput}
        sendMessage={handleSend}
        disabled={noTokenWarning || loading}
      />
    </div>
  );
}
