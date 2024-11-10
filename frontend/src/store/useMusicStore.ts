import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import toast from "react-hot-toast";
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
  stats: Stats;

  fetchAlbums: () => Promise<void>;
  fetchAlbumSongs: (id: string) => Promise<void>;
  fetchMadeForYou: () => Promise<void>;
  fetchFeatured: () => Promise<void>;
  fetchTrending: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
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
  stats: {
    totalSongs: 0,
    totalUsers: 0,
    totalAlbums: 0,
    totalArtists: 0,
  },

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

  fetchStats: async () => {
    // fetching data
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/stats");
      set({ stats: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchSongs: async () => {
    // fetching data
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/songs");
      set({ songs: response.data.songs });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSong: async (id) => {
    // fetching data
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));
      toast.success("Song deleted successfully");
    } catch (error: any) {
      toast.error("Something went wrong");
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteAlbum: async (id) => {
    // fetching data
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/albums/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((album) => album._id === id)?.title
            ? { ...song, albumId: null }
            : song
        ),
      }));
      toast.success("Album deleted successfully");
    } catch (error: any) {
      toast.error("Something went wrong");
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
