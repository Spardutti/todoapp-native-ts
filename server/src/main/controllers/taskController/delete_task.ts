import { TaskModel } from "../../models/TaskModel";
import { Request, Response, NextFunction } from "express";

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByIdAndDelete(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(next(error));
  }
};

export { deleteTask };
