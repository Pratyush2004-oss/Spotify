import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";

const SongList = () => {
  return (
    <Card className="w-[96vw] rounded-xl">
      <CardHeader className="">
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500" />
              Song Library
            </CardTitle>
            <CardDescription>Manage your music tracks</CardDescription>
          </div>
          <Button>+ Add</Button>
        </div>
      </CardHeader>
      <CardContent className="">
        <SongsTable />
      </CardContent>
    </Card>
  );
};

export default SongList;
