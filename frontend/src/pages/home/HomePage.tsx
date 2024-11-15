import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/store/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/store/usePlayerStore";
const HomePage = () => {
  const {
    fetchFeatured,
    fetchMadeForYou,
    fetchTrending,
    trending,
    madeforyou,
    isLoading,
    featured,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeatured();
    fetchTrending();
    fetchMadeForYou();
  }, [fetchFeatured, fetchTrending, fetchMadeForYou]);

  useEffect(() => {
    if (madeforyou.length > 0 && trending.length > 0 && featured.length > 0) {
      const allSongs = [...featured, ...madeforyou, ...trending];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeforyou, trending, featured]);
  return (
    <main className="h-full overflow-hidden rounded-lg ">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)] rounded-lg bg-gradient-to-b from-[#402b84] via-purple-700 to-zinc-800/75">
        <div className="p-4 sm:p-6">
          <h1 className="mb-6 text-2xl font-bold sm:text-3xl">
            Good Afternoon
          </h1>
          <FeaturedSection />

          <div className="space-y-8">
            <SectionGrid
              title="Made For You"
              songs={madeforyou}
              isLoading={isLoading}
            />
            <SectionGrid
              title="Trending"
              songs={trending}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
