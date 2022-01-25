import { CategoryModel } from "../../models/CategoryModel";
import { Request, Response, NextFunction } from "express";

const putCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json(category);
  } catch (error) {
    return next(error);
  }
};

export { putCategory };
