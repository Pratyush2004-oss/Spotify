import { AlbumModel } from "../models/album.model.js";
import { SongModel } from "../models/song.model.js";
import { UserModel } from "../models/user.model.js";

export const getstats = async (req, res, next) => {
    try {
        const [totalSongs, totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
            SongModel.countDocuments(),
            UserModel.countDocuments(),
            AlbumModel.countDocuments(),

            SongModelaggregate([
                {
                    $unionWith: {
                        coll: "albums",
                        pipeline: [],
                    },
                },
                {
                    $group: {
                        _id: "$artist",
                    },
                },
                {
                    $count: "count",
                },
            ]),
        ]);
        res.status(200).json({
            totalAlbums, totalSongs, totalUsers, totalArtist: uniqueArtists[0].count || 0, success: true
        })
    }
    catch (error) {
        console.log("Error in get-stats controller");
        next();
    }
}