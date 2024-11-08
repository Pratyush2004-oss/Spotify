import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";

const LeftSidebar = () => {
  const isLoading = true;
  return (
    <div className="flex flex-col h-full gap-2">
      {/* Navigation menu  */}
      <div className="p-4 rounded-lg bg-zinc-900">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "justify-start w-full text-white hover:bg-zinc-700",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <SignedIn>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "justify-start w-full text-white hover:bg-zinc-700",
                })
              )}
            >
              <MessageCircleIcon className="mr-2 size-5" />
              <span className="hidden sm:inline">Chat</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Library Section  */}
      <div className="flex-1 p-4 rounded-lg bg-zinc-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center px-2 text-white">
            <Library className="mr-2 size-5" />
            <span className="hidden sm:inline">Playlsit</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2"></div>
          {isLoading ? <PlaylistSkeleton /> : <></>}
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
