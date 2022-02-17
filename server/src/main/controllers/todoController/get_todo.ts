import { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";
import { TodoModel } from "../../models/TodoModel";

/* GET ALL USER TODOS */
const getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await TodoModel.find({
      author: req.user?._id,
      isCompleted: false,
    });

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

/* GET TODOS BY  CATEGORY */
const getTodosByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // FILTER BY DATE.
  try {
    const { category } = req.params;

    const todos = await TodoModel.find({
      category,
      isCompleted: false,
    }).populate("category");
    return res.status(200).json(todos);
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

/* GET TODAYS TODOS */
const getTodaysTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = DateTime.now().setLocale("en-US");

    const todos = await TodoModel.find({
      author: req.user?._id,
      dueDate: {
        $gte: today.set({ hour: 0, minute: 0, second: 0 }),
        $lte: today.set({ hour: 23, minute: 59, second: 59 }),
      },
      isCompleted: false,
    }).populate("category");

    res.json(todos);
  } catch (error) {
    return next(error);
  }
};

/* GET OVERDUE TODOS */
const getOverdueTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = DateTime.now().setLocale("en-US").toLocaleString();
    const todos = await TodoModel.find({
      author: req.user?._id,
      dueDate: { $lt: today },
      isCompleted: false,
    }).populate("category");

    res.json(todos);
  } catch (error) {
    return next(error);
  }
};

/* GET UPCOMING TODOS */
const getUpcomingTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const date = DateTime.now().setLocale("en-US").toLocaleString();

    const todos = await TodoModel.find({
      author: req.user?._id,
      dueDate: { $gte: date },
      isCompleted: false,
    }).populate("category");

    res.status(200).json(todos);
  } catch (error) {
    return next(error);
  }
};

/* GET COMPLETED TODOS */
const getCompletedTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await TodoModel.find({
      author: req.user?._id,
      isCompleted: true,
    });
    res.status(200).json(todos);
  } catch (error) {
    return next(error);
  }
};

/* GET LATES ACTIVITY TODOS */
const getLatestTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await TodoModel.find({
      author: req.user?._id,
    })
      .sort({ updated: -1 })
      .limit(5)
      .populate("category")
      .populate("author")
      .exec();

    res.status(200).json(todos);
  } catch (error) {
    console.log(error);

    return next(error);
  }
};

export {
  getAllTodos,
  getTodo,
  getTodosByCategory,
  getTodosByDate,
  getTodaysTodos,
  getOverdueTodos,
  getUpcomingTodos,
  getCompletedTodos,
  getLatestTodos,
};
