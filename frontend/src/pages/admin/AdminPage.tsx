import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music } from "lucide-react";
import SongList from "./components/SongList";
import AlbumsList from "./components/AlbumsList";
import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();
  if (!isAdmin && !isLoading) {
    return <div>Unauthorized</div>;
  }

  const { fetchSongs, fetchStats, fetchAlbums } = useMusicStore();
  useEffect(() => {
    fetchSongs();
    fetchStats();
    fetchAlbums();
  }, [fetchSongs, fetchAlbums, fetchStats]);
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100">
      <Header />

      <DashboardStats />

      <Tabs
        defaultValue="songs"
        className="flex flex-col items-center w-full space-y-6 rounded-xl "
      >
        <TabsList className="p-2">
          <TabsTrigger value="songs">
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger value="albums">
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>
        </TabsList>
        <TabsContent value="songs">
          <SongList />
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
