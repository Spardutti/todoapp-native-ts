import { TaskModel } from "../../models/TaskModel";
import { Request, Response, NextFunction } from "express";

/* EDIT TASK */
const putTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskName, taskDescription, dueDate, category, isCompleted } =
      req.body;
    const { id } = req.params;

    const task = await TaskModel.findByIdAndUpdate(
      id,
      {
        isCompleted: isCompleted ? false : true,
      },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(next(error));
  }
};

export { putTask };
