export default function ChatBubble({ role, content }: any) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
          role === "user"
            ? "bg-black text-white"
            : "bg-white border"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
