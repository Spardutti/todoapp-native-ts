import { Response, Request, NextFunction } from "express";
import { CategoryModel } from "../../models/CategoryModel";

/* NEW CATEGORY */
const newCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const category = new CategoryModel({
      name,
    });
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(next(error));
  }
};

export { newCategory };
