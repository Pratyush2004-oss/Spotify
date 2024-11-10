import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/store/useMusicStore";
import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface NewAlbum {
  title: string;
  artist: string;
  releaseYear: string;
}

const AlbumDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<{
    image: File | null;
  }>({
    image: null,
  });

  const [newAlbum, setnewAlbum] = useState<NewAlbum>({
    title: "",
    artist: "",
    releaseYear: "2000",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!files.image) return toast.error("Please upload an image");
      const formData = new FormData();
      formData.append("title", newAlbum.title);
      formData.append("artist", newAlbum.artist);
      formData.append("releaseYear", newAlbum.releaseYear);
      formData.append("imageFile", files.image);
      await axiosInstance.post("/admin/albums", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setnewAlbum({ title: "", artist: "", releaseYear: "2000" });
      setFiles({ image: null });
      toast.success("Album added successfully");
    } catch (error: any) {
      toast.error("Unable to add album : ", error.message);
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };
  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsDialogOpen(true)}> + Add</Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add a new Album</DialogTitle>
          <DialogDescription>
            Add a album to your music library
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            className="hidden"
            onChange={(e) =>
              setFiles((prev) => ({
                ...prev,
                image: e.target.files![0],
              }))
            }
          />

          {/* Image upload area */}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer border-zinc-700"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">
                    Image selected:
                  </div>
                  <div className="text-xs text-zinc-400">
                    {files.image.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="inline-block p-3 mb-2 rounded-full bg-zinc-800">
                    <Upload className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div className="mb-2 text-sm text-zinc-400">
                    Upload artwork
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* other input fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={newAlbum.title}
              onChange={(e) =>
                setnewAlbum({ ...newAlbum, title: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              value={newAlbum.artist}
              onChange={(e) =>
                setnewAlbum({ ...newAlbum, artist: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Release Year (year)</label>
            <Input
              type="number"
              min="0"
              value={newAlbum.releaseYear}
              onChange={(e) =>
                setnewAlbum({
                  ...newAlbum,
                  releaseYear: e.target.value || "0",
                })
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => setIsDialogOpen(false)}
            variant={"destructive"}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span>
                Adding<span className="animate-ping">...</span>
              </span>
            ) : (
              "Add Album"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumDialog;
