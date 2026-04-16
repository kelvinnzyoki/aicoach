import React from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  sendMessage: () => void;
}

export default function ChatInput({ input, setInput, sendMessage }: ChatInputProps) {
  return (
    <div className="p-3 border-t bg-white flex gap-2">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask your coach..."
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <Button onClick={sendMessage} disabled={!input.trim()}>
        Send
      </Button>
    </div>
  );
}
