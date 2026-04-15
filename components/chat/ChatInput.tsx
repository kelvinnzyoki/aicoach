import Input from "../ui/Input.js";
import Button from "../ui/Button.js";

export default function ChatInput({ input, setInput, sendMessage }: any) {
  return (
    <div className="p-3 border-t bg-white flex gap-2">
      <Input
        value={input}
        onChange={(e: any) => setInput(e.target.value)}
        placeholder="Ask your coach..."
        onKeyDown={(e: any) => e.key === "Enter" && sendMessage()}
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
}
