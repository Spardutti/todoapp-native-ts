import { TodoModel } from "../../models/TodoModel";
import { Request, Response, NextFunction } from "express";
import { CategoryModel } from "../../models/CategoryModel";
import { DateTime } from "luxon";

/* ADD A NEW TODO */
const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoName, todoDescription, categoryId } = req.body;

    const userId = req.user?._id;

    const dueDate = new Date(req.body.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    const category = await CategoryModel.findById(categoryId);

    const todo = new TodoModel({
      todoName,
      todoDescription,
      dueDate,
      author: userId,
      category,
    });

    await todo.save();
    return res.json(todo);
  } catch (error) {
    return next(error);
  }
};

export { addTodo };
