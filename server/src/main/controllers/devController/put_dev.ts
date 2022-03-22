import { UserModel } from "../../models/UserModel";
import { Request, Response, NextFunction } from "express"

/* EDIT THE USERS CREATED IN THE DB. ***DATABASE UPDATE BY DEVS PURPOSES ONLY*** */

const editCreatedUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
     try {
        const user = await UserModel.updateMany({}, {
            friendRequests:[],
        });
        
        res.status(200).json(user)
    } catch (error) {
        return next(error);
    }
 };

export { editCreatedUsers };