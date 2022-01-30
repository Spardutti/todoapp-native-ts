import { Request, Response, NextFunction } from "express";
import { TodoModel } from "../../models/TodoModel";

/* GET ALL USER TODOS */
const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await TodoModel.find({ author: req.user?._id });

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

/* GET TODOS BY DATE */
const getTodosByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date } = req.params;

  try {
    const todos = await TodoModel.find({
      author: req.user?._id,
      dueDate: date,
    });

    return res.status(200).json(todos);
  } catch (error) {
    return next(error);
  }
};

/* GET TODAYS AND OLDERS TODOS */
const getTodaysTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const today = await TodoModel.find({
      author: req.user?._id,
      dueDate: date,
    });
    const olders = await TodoModel.find({
      author: req.user?._id,
      dueDate: { $lt: date },
    }).sort({ dueDate: -1 });
    res.json({ today, olders });
  } catch (error) {
    return next(error);
  }
};

export {
  getAllTodos,
  getTodo,
  getTodoByStatus,
  getTodosByDate,
  getTodaysTodos,
};
