import { MessageModel } from "../models/message.model.js";
import { UserModel } from "../models/user.model.js";

// get all users 
export const getAllUsers = async (req, res, next) => {
    try {
        const currentUser = req.auth.userId
        const allusers = await UserModel.find({ clerkId: { $ne: currentUser } }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            allusers
        })
    } catch (error) {
        console.log("Error in get-all-users route : " + error.message)
        next(error);
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const myId = req.auth.userId;
        const { userId } = req.params;
        const messages = await MessageModel.find({ $or: [{ senderId: myId, receiverId: userId }, { senderId: userId, receiverId: myId }] }).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            messages
        })
    } catch (error) {
        console.log("Error in get Messages Controller : " + error.message)
        next(error)
    }
}