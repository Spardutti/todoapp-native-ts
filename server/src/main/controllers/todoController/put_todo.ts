import { TodoModel } from "../../models/TodoModel";
import { Request, Response, NextFunction } from "express";
import { DateTime } from "luxon";
import { CategoryModel } from "../../models/CategoryModel";

/* EDIT TODO */
const toggleIsCompleted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { isCompleted } = req.body;
    const { id } = req.params;

    const todo = await TodoModel.findByIdAndUpdate(
      id,
      {
        isCompleted: !isCompleted,
        updated: DateTime.now(),
        updateType: "Completed",
      },
      { new: true }
    );
    res.status(200).json(todo);
  } catch (error) {
    return next(error);
  }
};

const editTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoName, todoDescription, dueDate, categoryId } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findById(categoryId);

    const todo = await TodoModel.findByIdAndUpdate(id, {
      todoName,
      todoDescription,
      dueDate,
      category,
      updated: DateTime.now(),
      updateType: "Edited",
    });

    res.status(200).json(todo);
  } catch (error) {
    return next(error);
  }
};

export { toggleIsCompleted, editTodo };
