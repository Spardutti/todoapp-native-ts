import { TaskModel } from "../../models/TaskModel";
import { Request, Response, NextFunction } from "express";

/* CREATE A MEW TASL */
const addTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskName, taskDescription, dueDate } = req.body;
    const task = new TaskModel({ taskName, taskDescription, dueDate });
    await task.save();
    return res.json(task);
  } catch (error) {
    res.json(next(error));
    return;
  }
};

export { addTask };
