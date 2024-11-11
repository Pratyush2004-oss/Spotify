import Topbar from "@/components/Topbar";
import { useChatStore } from "@/store/useChatStore";
import { SignedOut, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UserList from "./components/UserList";
import ChatContainer from "./components/ChatContainer";

const ChatPage = () => {
  const { user } = useUser();
  const { selectedUser, fetchUsers, fetchMessages } = useChatStore();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  return (
    <main className="h-full overflow-hidden rounded-lg bg-gradient-to-b from-zinc-900 tp bg-zinc-800">
      <Topbar />

      <SignedOut>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-2">
            <img
              className="size-1/2 animate-bounce"
              src="spotify.svg"
              alt="Spotify"
            />
            <h1 className="text-2xl font-bold">
              Login to start a conversation
            </h1>
            <p>Select a Google Account to Login</p>
          </div>
        </div>
      </SignedOut>
      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UserList />
        <ChatContainer />
      </div>
    </main>
  );
};

export default ChatPage;
