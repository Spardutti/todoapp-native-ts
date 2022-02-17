import { TodoModel } from "../../models/TodoModel";
import { Request, Response, NextFunction } from "express";

/* EDIT TODO */
const toggleIsCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { isCompleted, completedDate } = req.body;
    const { id } = req.params;

    const todo = await TodoModel.findByIdAndUpdate(
      id,
      {
        isCompleted: !isCompleted,
        completedDate: new Date(Date.now()),
      },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    return next(error);
  }
};

export { toggleIsCompleted };
