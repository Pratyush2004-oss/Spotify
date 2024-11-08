import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    songUrl: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: false
    }
}, { timestamps: true });

export const SongModel = mongoose.model('Song', SongSchema);