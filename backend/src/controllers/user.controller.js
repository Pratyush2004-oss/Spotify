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