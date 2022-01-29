import { TodoModel } from "../../models/TodoModel";
import { Request, Response, NextFunction } from "express";
import { CategoryModel } from "../../models/CategoryModel";

/* ADD A NEW TODO */
const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { todoName, todoDescription, dueDate, categoryId } = req.body;

    const userId = req.user?._id;
    console.log(userId);
    
    // const category = await CategoryModel.findById(categoryId);

    const todo = new TodoModel({
      todoName,
      todoDescription,
      dueDate,
      author: userId,
      // category,
    });

    await todo.save();
    return res.json(todo);
  } catch (error) {
    return next(error);
  }
};

export { addTodo };
