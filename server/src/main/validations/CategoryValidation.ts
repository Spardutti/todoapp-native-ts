import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { CategoryModel } from "../models/CategoryModel";

const validateNewCategory = [
  body("categoryName")
    .notEmpty()
    .withMessage("Please enter a category name")
    .custom(async (categoryName) => {
      try {
        const category = await CategoryModel.findOne({
          categoryName: new RegExp(`^${categoryName}$`, "i"),
        });
        if (category) return Promise.reject();
      } catch (error) {
        throw error;
      }
    })
    .withMessage("Category already exist"),
  body("color").notEmpty().withMessage("Please select a color"),
  (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.json(validationErrors).status(500);
    }
    next();
  },
];

export { validateNewCategory };
