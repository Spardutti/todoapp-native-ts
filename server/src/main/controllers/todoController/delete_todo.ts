import { TodoModel } from "../../models/TodoModel";
import { Request, Response, NextFunction } from "express";

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findByIdAndDelete(id);
    res.status(200).json(todo);
  } catch (error) {
    return next(error);
  }
};

export { deleteTodo };
