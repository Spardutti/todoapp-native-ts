import { body, validationResult } from "express-validator";
import { TodoModel } from "../models/TodoModel";
import { Request, Response, NextFunction } from "express";

const validateNewTodo = [
  body("todoName").notEmpty().withMessage("Please enter a task name"),
  /*    .custom(async (todoName, { req }) => {
      try {
        const todo = await TodoModel.findOne({
          todoName: new RegExp(`^${todoName}$`, "i"),
          author: req.user._id,
        });
        if (todo) return Promise.reject();
      } catch (error) {
        throw error;
      }
    })
    .withMessage("Todo already exist"), */
  body("todoDescription")
    .notEmpty()
    .withMessage("Please enter a todo Description"),
  body("dueDate").notEmpty().withMessage("Please select a Date"),
  body("categoryId").notEmpty().withMessage("Please select a Category"),

  (req: Request, res: Response, next: NextFunction) => {
    const validationsErrors = validationResult(req);
    if (!validationsErrors.isEmpty())
      return res.status(500).json(validationsErrors);
    next();
  },
];

export { validateNewTodo };
