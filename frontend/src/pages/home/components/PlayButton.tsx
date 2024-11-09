import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

const PlayButton = ({ song }: { song: Song }) => {
  const { currentSong, togglePlay, isPlaying, setCurrentSong } =
    usePlayerStore();
  const isCurrentSong = song._id === currentSong?._id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <Button size={"icon"}
      onClick={handlePlay}
      className={`absolute bottom-4 right-2 bg-green-500 text-black p-2 rounded-full transition-all opacity-0 hover:scale-105 translate-y-2 hover:bg-green-400 group-hover:translate-y-0 ${
        isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      {isPlaying && isCurrentSong ? <Pause /> : <Play />}
    </Button>
  );
};

export default PlayButton;
