import { axiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  madeforyou: Song[];
  trending: Song[];
  featured: Song[];
  fetchAlbums: () => Promise<void>;
  fetchAlbumSongs: (id: string) => Promise<void>;
  fetchMadeForYou: () => Promise<void>;
  fetchFeatured: () => Promise<void>;
  fetchTrending: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeforyou: [],
  trending: [],
  featured: [],

  fetchAlbums: async () => {
    // fetching data
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data.albums, isLoading: false });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumSongs: async (id) => {
    // fetching data
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data.album });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYou: async () => {
    // fetching data
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/maade-for-u");
      set({ madeforyou: response.data.songs });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

   fetchFeatured: async () => {
    // fetching data
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/featured");
      set({ featured: response.data.songs });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrending: async () => {
    // fetching data
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs/trending");
      set({ trending: response.data.songs });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
