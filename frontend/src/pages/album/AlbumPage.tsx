import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const formatDutation = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { isLoading, currentAlbum, fetchAlbumSongs } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumSongs(albumId!);
  }, [albumId, fetchAlbumSongs]);

  if (isLoading) return <div>Loading...</div>;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurentAlbumPlaying) {
      togglePlay();
    } else {
      // start playing the album from the beginning
      playAlbum(currentAlbum!.songs, 0);
    }
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum!.songs, index);
  };
  return (
    <div className="h-full ">
      <ScrollArea className="h-full rounded-lg">
        {/* Main Content */}
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0] via-zinc-900/80 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />
          {/* content */}
          <div className="relative z-10">
            <div className="flex gap-6 p-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl touch-none rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="my-4 font-bold text-7xl">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-bold text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span className="font-semibold">·</span>
                  <span className="">{currentAlbum?.songs.length} songs</span>
                  <span className="font-semibold">·</span>
                  <span className="font-semibold">
                    {currentAlbum?.releaseYear}
                  </span>
                </div>
              </div>
            </div>
            {/* Play Button */}
            <div className="flex items-center gap-6 px-6 pb-4">
              <Button
                onClick={handlePlayAlbum}
                className="transition-all bg-green-500 rounded-full size-14 hover:bg-green-400 hover:scale-105"
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className="text-black size-10" size="icon" />
                ) : (
                  <Play className="text-black size-10" size="icon" />
                )}
              </Button>
            </div>

            {/* Table section */}
            <div className="bg-black/20 backdrop-blur-sm">
              {/* Table Header */}
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/3">
                <div>#</div>
                <div>Title</div>
                <div>Released Year</div>
                <div>
                  <Clock className="size-4" />
                </div>
              </div>

              {/* Table Body */}
              <div className="px-6">
                <div className="py-4 space-y-2">
                  {currentAlbum?.songs.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        onClick={() => handlePlaySong(index)}
                        key={song._id}
                        className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 text-sm px-4 py-2 text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                      >
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <div className="text-green-500 size-4">♫</div>
                          ) : (
                            <span className="group-hover:hidden">
                              {index + 1}
                            </span>
                          )}
                          {!isCurrentSong && (
                            <Play className="hidden size-4 group-hover:block" />
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-10"
                          />
                          <div className="font-medium text-white">
                            <div>{song.artist}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {song.createdAt.split("T")[0]}
                        </div>
                        <div className="flex items-center">
                          {formatDutation(song.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
