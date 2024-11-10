import { Song } from "@/types";
import { create } from "zustand";
import { useChatStore } from "./useChatStore";

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

    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: "Listening to " + song.title + " by " + song.artist,
      });
    }
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
    const socket = useChatStore.getState().socket;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: "Listening to " + song.title + " by " + song.artist,
      });
    }
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
    const currentSong = get().currentSong;
    const socket = useChatStore.getState().socket;
    if (!currentSong) return;
    if (socket.auth) {
      socket.emit("update_activity", {
        userId: socket.auth.userId,
        activity: willStartPlaying
          ? "Listening to " + currentSong.title + " by " + currentSong.artist
          : "Idle",
      });
    }
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
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: "Listening to " + nextSong.title + " by " + nextSong.artist,
        });
      }
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: "Idle",
        });
      }
    }
  },
  playPrevious: () => {
    const { currentIndex, queue } = get();
    const previousIndex = currentIndex - 1;
    //   if there os a previous song to play, Let's play it
    if (previousIndex >= 0) {
      const previousSong = queue[previousIndex];
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity:
            "Listening to " + previousSong.title + " by " + previousSong.artist,
        });
      }
      set({
        currentSong: previousSong,
        currentIndex: previousIndex,
        isPlaying: true,
      });
    } else {
      set({ isPlaying: false });
      const socket = useChatStore.getState().socket;
      if (socket.auth) {
        socket.emit("update_activity", {
          userId: socket.auth.userId,
          activity: "Idle",
        });
      }
    }
  },
}));
