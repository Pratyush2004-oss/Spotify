import { useMusicStore } from "@/store/useMusicStore";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore();

  const handleDeleteSong = async (id: string) => {
    await deleteSong(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400 animate-ping">Loading Songs...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">{error}</div>
      </div>
    );
  }
  return (
    <Table>
      <TableCaption>A list of your Songs.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs.map((song) => (
          <TableRow key={song._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img src={song.imageUrl} className="w-12 h-12" alt={song.title} />
            </TableCell>
            <TableCell>{song.title}</TableCell>
            <TableCell>{song.artist}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="size-4" />
                {song.createdAt.split("T")[0]}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  className="text-red-500 hover:text-red-300 hover:bg-red-400/10"
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => handleDeleteSong(song._id)}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin size-4" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SongsTable;
