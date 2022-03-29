import { Response, Request, NextFunction } from "express";
import { UserModel } from "../../models/UserModel";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.json(500).json("User not found");
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

/* GET USER'S FRIENDS LIST */

const getUserFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const friends = await UserModel.findById(id).populate("friends");

    res.status(200).json(friends);
  } catch (error) {
    return next(error);
  }
};

export { getUser, getUserFriends };
