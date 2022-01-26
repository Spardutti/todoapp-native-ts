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
    return next(error);
  }
};

/* GET CATEGORY BY ID */
const getCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id).populate("categoryName");
    res.status(200).json(category);
  } catch (error) {
    return next(error);
  }
};

/* GET CATEGORIES BY USER ID */
const getCategoriesByUser = async (req:Request, res:Response, next: NextFunction) => {

  const user = req.user?._id

  const category = await CategoryModel.find({author: user})
  res.status(200).json(category);
  try {
    
  } catch (error) {
    return next(error)
  }
}


export { getAllCategories, getCategory, getCategoriesByUser };
