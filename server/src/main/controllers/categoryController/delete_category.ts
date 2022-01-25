import { CategoryModel } from "../../models/CategoryModel";
import { Request, Response, NextFunction } from "express";
import { TaskModel } from "../../models/TaskModel";

/* DELETE A CATEGORY AND ALL TASK THAT BELONG TO THAT CATEGORY */
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    const tasks = await TaskModel.find({ category: id });
    if (tasks.length > 0) {
      return res.status(200).json({ msg: "task exist", tasks });
    }
    await category?.delete();
    res.status(200).json(category);
  } catch (error) {
    return next(error);
  }
};

export { deleteCategory };
