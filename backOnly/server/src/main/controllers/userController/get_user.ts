import { Response, Request, NextFunction } from "express";
import { UserModel } from "../../models/UserModel";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.json(500).json("User not found");
    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
