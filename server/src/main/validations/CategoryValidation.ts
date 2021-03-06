import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { CategoryModel } from "../models/CategoryModel";

const validateNewCategory = [
  body("categoryName")
    .notEmpty()
    .withMessage("Please enter a category name")
    .custom(async (categoryName, { req }) => {
      try {
        const category = await CategoryModel.findOne({
          categoryName: new RegExp(`^${categoryName}$`, "i"),
          author: req.user._id,
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
      return res.status(500).json(validationErrors);
    }
    next();
  },
];

export { validateNewCategory };
