import { Request, Response, NextFunction } from "express";
import { TaskModel } from "../../models/TaskModel";

/* GET ALL TASKS */
const getAllTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(next(error));
  }
};

/* GET TASK BY ID */
const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(next(error));
  }
};

/* GET TASKS BY STATUS  */
const getTaskByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.params;
    const tasks = await TaskModel.find({ isCompleted: status });
    if (tasks.length === 0) return res.json("None");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(next(error));
  }
};

export { getAllTask, getTask, getTaskByStatus };
