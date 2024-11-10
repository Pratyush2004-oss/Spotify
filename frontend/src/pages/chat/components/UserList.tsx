import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/store/useChatStore";

const UserList = () => {
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } =
    useChatStore();
  return (
    <div className="border-r-2 border-zinc-800">
      <div className="flex flex-col h-full">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="p-4 space-y-2">
            {isLoading ? (
              <UsersListSkeleton />
            ) : (
              users.map((user) => (
                <div
                  className="transition-colors rounded-lg cursor-pointer group hover:bg-zinc-800/50"
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                >
                  <div
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      selectedUser?.clerkId === user.clerkId
                        ? "bg-zinc-800/50"
                        : "hover:bg-zinc-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Avatar className="border size-10 border-zinc-800">
                          <AvatarImage
                            src={user.imageUrl}
                            alt={user.fullName}
                          />
                          <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute bottom-0 right-0 w-3 h-3 border-2 rounded-full ${
                            onlineUsers.has(user.clerkId)
                              ? "bg-green-500"
                              : "bg-zinc-500"
                          } border-zinc-900`}
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{user.fullName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UserList;
