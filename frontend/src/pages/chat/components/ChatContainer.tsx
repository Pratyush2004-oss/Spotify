import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import MessageInput from "./MessageInput";

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const ChatContainer = () => {
  const { messages, selectedUser, onlineUsers } = useChatStore();
  const { user } = useUser();
  if (!selectedUser)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <img
            className="size-1/2 animate-bounce"
            src="spotify.svg"
            alt="Spotify"
          />
          <h1 className="text-2xl font-bold">Select a user to start a chat</h1>
          <p>Select a friend to start a conversation</p>
        </div>
      </div>
    );
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Avatar className="border rounded-full size-10 border-zinc-800 ">
            <AvatarImage
              className="border rounded-full size-10 border-zinc-800 "
              src={selectedUser.imageUrl}
              alt={selectedUser.fullName}
            />
            <AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{selectedUser.fullName}</p>
            <p className="text-sm font-semibold text-zinc-400">
              {onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area component */}
      <ScrollArea className="h-[calc(100vh-340px)]">
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex items-start gap-3 ${
                message.senderId === user?.id ? "flex-row-reverse " : ""
              }`}
            >
              <Avatar className="border rounded-full size-10 border-zinc-800 ">
                <AvatarImage
                  className="border rounded-full size-10 border-zinc-800 "
                  src={
                    message.senderId === user?.id
                      ? user?.imageUrl
                      : selectedUser.imageUrl
                  }
                />
                <AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-3 max-w-[70%] ${
                  message.senderId === user?.id
                    ? "bg-green-300/50"
                    : "bg-zinc-800/50"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="block mt-1 text-xs text-zinc-300">
                  {formatTime(message.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* send Message */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
