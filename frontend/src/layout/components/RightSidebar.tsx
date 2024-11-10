import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";
import { useChatStore } from "@/store/useChatStore";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RightSidebar = () => {
  const { fetchUsers, isLoading, users, onlineUsers, userActivities } =
    useChatStore();
  const { user } = useUser();
  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);
  return (
    <div className="flex flex-col h-full gap-2">
      <SignedIn>
        <div className="h-full p-4 rounded-lg bg-zinc-900/75 backdrop-blur-lg">
          {isLoading ? (
            <UsersListSkeleton />
          ) : (
            <>
              {/* Header Section */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Users className="size-5 shrink-0" />
                  <h2 className="font-semibold">What they're listening to</h2>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                  {users.map((user) => {
                    const activity = userActivities.get(user.clerkId);
                    const isPlaying = activity && activity !== "Idle";
                    return (
                      <div
                        className="transition-colors rounded-lg cursor-pointer group hover:bg-zinc-800/50"
                        key={user._id}
                      >
                        <div className="flex items-center gap-3 p-3">
                          <div className="relative">
                            <Avatar className="border size-10 border-zinc-800">
                              <AvatarImage
                                src={user.imageUrl}
                                alt={user.fullName}
                              />
                              <AvatarFallback>
                                {user.fullName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`absolute bottom-0 right-0 w-3 h-3 border-2 rounded-full border-zinc-900  ${
                                onlineUsers.has(user.clerkId)
                                  ? "bg-green-500"
                                  : "bg-zinc-500"
                              }`}
                            />
                          </div>

                          <div className="flex-1 min-w-0 ">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">
                                {user.fullName}
                              </span>
                              {isPlaying && (
                                <Music className="text-green-400 size-4" />
                              )}
                            </div>
                            {isPlaying ? (
                              <div className="mt-1">
                                <div className="mt-1 text-sm font-medium text-white truncate">
                                  {
                                    activity
                                      .replace("Listening to ", "")
                                      .split(" by ")[0]
                                  }
                                </div>
                                <div className="text-xs truncate text-zinc-400">
                                  {activity.split(" by ")[1]}
                                </div>
                              </div>
                            ) : (
                              <div className="mt-1 text-xs text-zinc-400">
                                Idle
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <LoginPrompt />
      </SignedOut>
    </div>
  );
};

export default RightSidebar;

const LoginPrompt = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-4 rounded-lg backdrop-blur-lg">
      <div className="relative">
        <div
          className="absolute rounded-full opacity-75 -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 blur-lg animate-pulse"
          aria-hidden="true"
        />
        <div className="relative p-4 rounded-full bg-zinc-900">
          <HeadphonesIcon className="size-8 text-emerald-400" />
        </div>
      </div>
      <div className="space-y-3 max-w-[250px]">
        <h3 className="text-lg font-semibold text-white">
          See what Friends are listening to
        </h3>
        <p className="text-sm text-zinc-400">
          Login to discover what tour Friends are enjoying right now
        </p>
      </div>
    </div>
  );
};
