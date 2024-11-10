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
import { Calendar, Loader, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
const AlbumTable = () => {
  const { albums, isLoading, error, deleteAlbum } = useMusicStore();
  const handleDeleteAlbum = async (id: string) => {
    await deleteAlbum(id);
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400 animate-ping">Loading albums...</div>
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
      <TableCaption>A list of your albums added.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Year</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((album) => (
          <TableRow key={album._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={album.imageUrl}
                className="w-12 h-12"
                alt={album.title}
              />
            </TableCell>
            <TableCell>{album.title}</TableCell>
            <TableCell>{album.artist}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="size-4" />
                {album.releaseYear}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  className="text-red-500 hover:text-red-300 hover:bg-red-400/10"
                  variant={"ghost"}
                  size={"sm"}
                  onClick={() => handleDeleteAlbum(album._id)}
                >
                  {isLoading ? <Loader /> : <Trash2 className="size-4" />}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AlbumTable;
