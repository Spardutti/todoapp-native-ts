import { body, validationResult } from "express-validator";
import { TaskModel } from "../models/TaskModel";
import { Request, Response, NextFunction } from "express";

const validateNewTask = [
  body("taskName")
    .notEmpty()
    .withMessage("Please enter a task name")
    .custom(async (taskName) => {
      try {
        const task = await TaskModel.findOne({
          taskName: new RegExp(`^${taskName}$`, "i"),
        });
        if (task) return Promise.reject();
      } catch (error) {
        throw error;
      }
    })
    .withMessage("Task already exist"),
  body("taskDescription")
    .notEmpty()
    .withMessage("Please enter a task Description"),
  body("dueDate").notEmpty().withMessage("Please select a Date"),
  body("category").notEmpty().withMessage("Please select a Category"),

  (req: Request, res: Response, next: NextFunction) => {
    const validationsErrors = validationResult(req);
    if (!validationsErrors.isEmpty())
      return res
        .status(500)
        .json({ validationsErrors: validationsErrors.array() });
    next();
  },
];

export { validateNewTask };
