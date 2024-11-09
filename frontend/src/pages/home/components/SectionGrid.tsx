import { Song } from "@/types";
import SectionGridSkeleton from "./SEctionGridSkeleton";
import { Button } from "@/components/ui/button";

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

const SectionGrid = ({ title, songs, isLoading }: SectionGridProps) => {
  if (isLoading) return <SectionGridSkeleton />;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
        <Button
          className="text-sm text-zinc-400 hover:text-white"
          variant={"link"}
        >
          {" "}
          Show All
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className="p-4 transition-all rounded-md cursor-pointer bg-zinc-800/40 hover:bg-zinc-700/40 group"
          >
            <div className="relative mb-4">
              <div className="overflow-hidden rounded-md shadow-lg aspect-square">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {/* Play button */}
            </div>
            <h3 className="mb-2 font-medium truncate">{song.title}</h3>
            <p className="text-sm truncate text-zinc-400">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;