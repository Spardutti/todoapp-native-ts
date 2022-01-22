import { TaskModel } from "../../models/TaskModel";
import { Request, Response, NextFunction } from "express";

/* CREATE A MEW TASK */
const addTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskName, taskDescription, dueDate, category } = req.body;
    const task = new TaskModel({
      taskName,
      /*  taskDescription,
      dueDate,
      category, */
    });
    await task.save();
    return res.json(task);
  } catch (error) {
    return next(error);
  }
};

export { addTask };
