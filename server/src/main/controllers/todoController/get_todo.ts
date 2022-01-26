import { Request, Response, NextFunction } from "express";
import { TodoModel } from "../../models/TodoModel";

/* GET ALL TODOS */
const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await TodoModel.find({ author: req.params.userid });

    res.status(200).json(todos);
  } catch (error) {
    return next(error);
  }
};

/* GET TODO BY ID */
const getTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);
    if (!todo) return res.status(404).json("error");
    if (todo) return res.status(200).json(todo);
  } catch (error) {
    return next(error);
  }
};

/* GET TODOS BY STATUS OR CATEGORY */
const getTodoByStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // FILTER BY DATE.
  try {
    const { status, category } = req.query;
    if (status) {
      const todos = await TodoModel.find({ isCompleted: status });
      if (todos.length === 0) return res.json("None");
      return res.status(200).json(todos);
    }
    if (category) {
      const todos = await TodoModel.find({ category: category });
      if (todos.length === 0) return res.json("None");
      return res.status(200).json(todos);
    }
  } catch (error) {
    return next(error);
  }
};

// ORDER BY DATE

export { getAllTodos, getTodo, getTodoByStatus };
