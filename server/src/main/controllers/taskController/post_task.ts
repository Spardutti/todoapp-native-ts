import { TaskModel } from "../../models/TaskModel";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../../models/UserModel";
import { CategoryModel } from "../../models/CategoryModel";

/* ADD A NEW TASK */
const addTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskName, taskDescription, dueDate, categoryId, userId, userForId, } = req.body;

    //const author = await UserModel.findById(userId)
    //const category = await CategoryModel.findById(categoryId)
    //const taskFor = await UserModel.findById(userForId);

    const task = new TaskModel({
      taskName,
      taskDescription,
      //dueDate,
      //author,
      //category,
      //taskFor,
    });
    await task.save();
    return res.json(task);
  } catch (error) {
    return next(error);
  }
};

export { addTask };
