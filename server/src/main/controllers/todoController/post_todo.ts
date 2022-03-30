import { TodoModel } from "../../models/TodoModel";
import { Request, Response, NextFunction } from "express";
import { CategoryModel } from "../../models/CategoryModel";
import { DateTime } from "luxon";

/* ADD A NEW TODO */
const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      todoName,
      todoDescription,
      categoryId,
      dueDate,
      sharedTodo,
      sharedWith,
    } = req.body;

    const userId = req.user?._id;

    const category = await CategoryModel.findById(categoryId);

    const todo = new TodoModel({
      todoName,
      todoDescription,
      dueDate,
      author: userId,
      category,
      updated: DateTime.now().setLocale("en-US"),
      sharedTodo,
      sharedWith,
    });

    //await todo.save();

    return [res.json(todo), console.log(sharedTodo)];
  } catch (error) {
    return next(error);
  }
};

export { addTodo };
