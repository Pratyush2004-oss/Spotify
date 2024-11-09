import { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], statrtIndex: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  //   initailizong the queue of the song
  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong,
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  //   play album
  playAlbum: (songs: Song[], startindex = 0) => {
    if (songs.length === 0) return;
    const song = songs[startindex];
    set({
      queue: songs,
      currentSong: song,
      currentIndex: startindex,
      isPlaying: true,
    });
  },

  //   setting the current song
  setCurrentSong: (song: Song | null) => {
    if (!song) return;
    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },

  //   play andpause the button
  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;
    set({
      isPlaying: willStartPlaying,
    });
  },

  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    //   if there os a next song to play, Let's play it
    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },
  playPrevious: () => {
    const { currentIndex, queue } = get();
    const previousIndex = currentIndex - 1;
    //   if there os a previous song to play, Let's play it
    if (previousIndex >= 0) {
      const previousSong = queue[previousIndex];
      set({
        currentSong: previousSong,
        currentIndex: previousIndex,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
    }
  },
}));
