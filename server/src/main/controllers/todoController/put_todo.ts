import { TodoModel } from "../../models/TodoModel";
import { Request, Response, NextFunction } from "express";

/* EDIT TODO */
const putTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoName, todoDescription, dueDate, category, isCompleted } =
      req.body;
    const { id } = req.params;

    const todo = await TodoModel.findByIdAndUpdate(
      id,
      {
        isCompleted: !isCompleted,
      },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    return next(error);
  }
};

export { putTodo };
