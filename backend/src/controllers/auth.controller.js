import { UserModel } from "../models/user.model.js";

export const authCallback= async (req, res, next) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        // check if user already exist 
        const user = await UserModel.findOne({ clerkId: id });
        if (!user) {
			// signup
			await UserModel.create({
				clerkId: id,
				fullName: `${firstName || ""} ${lastName || ""}`.trim(),
				imageUrl,
			});
		}
        res.status(200).json({
            success: true,
            message: "Account created successfully"
        })
    } catch (error) {
        console.log('Error in authcontroller : ', error.message);
        next(error)

    }
}