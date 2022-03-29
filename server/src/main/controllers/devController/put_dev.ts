import { UserModel } from "../../models/UserModel";
import { Request, Response, NextFunction } from "express";
import { TodoModel } from "../../models/TodoModel";

/* EDIT THE USERS CREATED IN THE DB. ***DATABASE UPDATE BY DEVS PURPOSES ONLY*** */

const editCreatedUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserModel.updateMany(
      {},
      {
        friendRequests: [],
      }
    );

    res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

/* EDIT THE TODOS CREATED IN THE DB. ***DATABASE UPDATE BY DEVS PURPOUSES ONLY*** */

const editCreatedTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await TodoModel.updateMany(
      {},
      {
        sharedTodo: false,
        sharedWith: [],
      }
    );
    res.status(200).json(todo);
  } catch (error) {
    return next(error);
  }
};

export { editCreatedUsers, editCreatedTodos };
