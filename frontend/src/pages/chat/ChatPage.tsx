import Topbar from "@/components/Topbar";
import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
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
      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UserList />
        <ChatContainer />
      </div>
    </main>
  );
};

export default ChatPage;
