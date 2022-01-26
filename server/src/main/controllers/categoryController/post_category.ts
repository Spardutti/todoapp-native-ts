import { Response, Request, NextFunction } from "express";
import { CategoryModel } from "../../models/CategoryModel";


/* NEW CATEGORY */
const newCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryName } = req.body;

    const userId = req.user?._id;

    const category = new CategoryModel({
      categoryName,
      author: userId,
    });
    await category.save();
    return res.json(category);
  } catch (error) {
    return next(error);
  }
};

export { newCategory };
