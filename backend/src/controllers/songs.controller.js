import { SongModel } from "../models/song.model.js";

// get all songs
export const getAllSongs = async (req, res, next) => {
    try {
        const songs = await SongModel.find().sort({ createdAt: -1 })

        res.status(201).json({
            songs,
            success: false
        })
    } catch (error) {
        console.log("Error in get-all-songs controller : " + error.message);
        next(error);
    }
}

// get featured songs
export const getFeaturedSongs = async (req, res, next) => {
    try {
        const songs = await SongModel.aggregate([
            {
                $sample: { size: 6 }
            },
            {
                $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, songUrl: 1 }
            }
        ]);
        res.status(201).json({
            success: true,
            songs
        })
    } catch (error) {
        console.log("Error in get-featured-songs controller : " + error.message);
        next(error);
    }
}

// get made-for-u songs
export const getMadeForyou = async (req, res, next) => {
    try {
        const songs = await SongModel.aggregate([
            {
                $sample: { size: 4 }
            },
            {
                $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, songUrl: 1 }
            }
        ]);
        res.status(201).json({
            success: true,
            songs
        })
    } catch (error) {
        console.log("Error in get-made-for-u-songs controller : " + error.message);
        next(error);
    }
}

// get trending songs
export const getTrending = async (req, res, next) => {
    try {
        const songs = await SongModel.aggregate([
            {
                $sample: { size: 4 }
            },
            {
                $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, songUrl: 1 }
            }
        ]);
        res.status(201).json({
            success: true,
            songs
        })
    } catch (error) {
        console.log("Error in get-trending-songs controller : " + error.message);
        next(error);
    }
}

// get songs by id
export const getSongById = async (req, res, next) => {
    try {

    } catch (error) {
        console.log("Error in ge-song-by-id controller : " + error.message);
        next(error);
    }
}