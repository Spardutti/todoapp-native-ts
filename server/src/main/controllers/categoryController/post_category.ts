import { Response, Request, NextFunction } from "express";
import { CategoryModel } from "../../models/CategoryModel";

/* NEW CATEGORY */
const newCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryName, color } = req.body;

    const userId = req.user?._id;

    console.log(categoryName, color);

    const category = new CategoryModel({
      categoryName,
      author: userId,
      color,
    });
    await category.save();
    return res.json(category);
  } catch (error) {
    return next(error);
  }
};

export { newCategory };
