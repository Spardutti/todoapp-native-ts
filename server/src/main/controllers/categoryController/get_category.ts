import { Request, Response, NextFunction } from "express";
import { CategoryModel } from "../../models/CategoryModel";

/* GET ALL CATEGORIES */
const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(next(error));
  }
};

/* GET CATEGIRY BY ID */
const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

export { getAllCategories, getCategory };
