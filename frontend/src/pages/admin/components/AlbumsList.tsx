import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import AlbumTable from "./AlbumTable";
import AlbumDialog from "./AlbumDialog";

const AlbumsList = () => {
  return (
    <Card className="w-[96vw] rounded-xl">
      <CardHeader className="">
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Library className="size-5 text-emerald-500" />
              Album Library
            </CardTitle>
            <CardDescription>Manage your Albums</CardDescription>
          </div>
          <AlbumDialog />
        </div>
      </CardHeader>
      <CardContent className="">
        <AlbumTable />
      </CardContent>
    </Card>
  );
};

export default AlbumsList;
