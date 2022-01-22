import { Request, Response, NextFunction } from "express";
import { TaskModel } from "../../models/TaskModel";

/* GET ALL TASKS */
const getAllTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(next(error));
    // FILTER BY DATE.
  }
};

/* GET TASK BY ID */
const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    if (!task) return res.status(404).json("error");
    if (task) return res.status(200).json(task);
  } catch (error) {
    return next(error);
  }
};

/* GET TASKS BY STATUS OR CATEGORY */
const getTaskByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // FILTER BY DATE.
  try {
    const { status, category } = req.query;
    if (status) {
      const tasks = await TaskModel.find({ isCompleted: status });
      if (tasks.length === 0) return res.json("None");
      return res.status(200).json(tasks);
    }
    if (category) {
      const tasks = await TaskModel.find({ category: category });
      if (tasks.length === 0) return res.json("None");
      return res.status(200).json(tasks);
    }
  } catch (error) {
    res.status(500).json(next(error));
  }
};

// ORDER BY DATE

export { getAllTask, getTask, getTaskByStatus };
