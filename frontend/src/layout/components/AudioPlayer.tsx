import { usePlayerStore } from "@/store/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // to handle play and pause of the song
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  // handle song ends
  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => {
      playNext();
    };
    audio?.addEventListener("ended", handleEnded);
    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  // handle song changes
  useEffect(() => {
    if (!currentSong || !audioRef.current) return;
    const audio = audioRef.current;
    // check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.songUrl;
    if (isSongChange) {
      audio.src = currentSong?.songUrl!;
      // reset the playback position
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.songUrl;
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
