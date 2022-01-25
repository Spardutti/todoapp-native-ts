import { Response, Request, NextFunction } from "express";
import { CategoryModel } from "../../models/CategoryModel";
import { UserController } from "../userController/UserController";
import { UserModel } from "../../models/UserModel";

/* NEW CATEGORY */
const newCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryName, userId } = req.body;

    //const author = await UserModel.findById(userId)

    const category = new CategoryModel({
      categoryName,
     // author,
    });
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(next(error));
  }
};

export { newCategory };
