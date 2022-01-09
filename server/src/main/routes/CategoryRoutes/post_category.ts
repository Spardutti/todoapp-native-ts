import { Router } from "express";
import { CategoryController } from "../../controllers/categoryController/CategoryController";
import { validateNewCategory } from "../../validations/CategoryValidation";
const router = Router();

/* NEW CAT */
router.post(
  "/newCategory",
  validateNewCategory,
  CategoryController.newCategory
);

export { router };
