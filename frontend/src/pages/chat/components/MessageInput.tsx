import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();
  const { selectedUser, sendMessage } = useChatStore();

  const handleSend = () => {
    if (!selectedUser || !user || !newMessage) return;

    sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
    setNewMessage("");
  };
  return (
    <div className="p-4 mt-auto border-t border-zinc-800">
      <div className="flex items-center gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="border-none bg-zinc-800"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          size={"icon"}
          onClick={handleSend}
          disabled={!selectedUser || !user || !newMessage}
        >
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;
