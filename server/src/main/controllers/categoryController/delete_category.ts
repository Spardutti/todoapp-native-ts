import { CategoryModel } from "../../models/CategoryModel";
import { Request, Response, NextFunction } from "express";
import { TodoModel } from "../../models/TodoModel";

/* DELETE A CATEGORY AND ALL TODO THAT BELONG TO THAT CATEGORY */
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    const todos = await TodoModel.find({ category: id });
    if (todos.length > 0) {
      return res.status(200).json({ msg: "todo exist", todos });
    }
    await category?.delete();
    res.status(200).json(category);
  } catch (error) {
    return next(error);
  }
};

export { deleteCategory };
