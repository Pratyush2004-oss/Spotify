import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";

const LeftSidebar = () => {
  const { isLoading, albums, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
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
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link
                  key={album._id}
                  to={`/albums/${album._id}`}
                  className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-zinc-800 group"
                >
                  <img
                    src={album.imageUrl}
                    alt={album.title}
                    className="flex-shrink-0 object-cover rounded-md size-12"
                  />
                  <div className="flex-1 hidden min-w-0 space-y-2 md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm truncate text-zinc-400">
                      Album • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
