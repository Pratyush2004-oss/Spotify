import FeaturedGridSkeleton from "@/components/skeletons/FeaturedSkeleton";
import { useMusicStore } from "@/store/useMusicStore";
const FeaturedSection = () => {
  const { isLoading, featured, error } = useMusicStore();
  if (isLoading) {
    return <FeaturedGridSkeleton />;
  }
  if (error) {
    return <div className="my-4 text-lg text-red-500">{error}</div>;
  }
  return (
    <div className='grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3'>
			{featured.map((song) => (
				<div
					key={song._id}
					className='relative flex items-center overflow-hidden transition-colors rounded-md cursor-pointer bg-zinc-800/50 hover:bg-zinc-700/50 group'
				>
					<img
						src={song.imageUrl}
						alt={song.title}
						className='flex-shrink-0 object-cover w-16 h-16 sm:w-20 sm:h-20'
					/>
					<div className='flex-1 p-4'>
						<p className='font-medium truncate'>{song.title}</p>
						<p className='text-sm truncate text-zinc-400'>{song.artist}</p>
					</div>
				</div>
			))}
		</div>
  );
};

export default FeaturedSection;
