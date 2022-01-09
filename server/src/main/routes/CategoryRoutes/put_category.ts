import { Router } from "express";
import { CategoryController } from "../../controllers/categoryController/CategoryController";
import { validateNewCategory } from "../../validations/CategoryValidation";
const router = Router();

router.put(
  "/putcategory/:id",
  validateNewCategory,
  CategoryController.putCategory
);

export { router };
