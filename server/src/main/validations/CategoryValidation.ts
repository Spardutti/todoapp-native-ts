import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { CategoryModel } from "../models/CategoryModel";

const validateNewCategory = [
  body("name")
    .notEmpty()
    .withMessage("Please enter a category name")
    .custom(async (name) => {
      try {
        const category = await CategoryModel.findOne({
          name: new RegExp(`^${name}$`, "i"),
        });
        if (category) return Promise.reject();
      } catch (error) {
        throw error;
      }
    })
    .withMessage("Category already exist"),
  (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res
        .status(500)
        .json({ validationErrors: validationErrors.array() });
    }
    next();
  },
];

export { validateNewCategory };
