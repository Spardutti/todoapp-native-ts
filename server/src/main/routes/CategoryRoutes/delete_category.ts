import { CategoryController } from "../../controllers/categoryController/CategoryController";
import { Router } from "express";
const router = Router();

router.delete("/deleteCategory/:id", CategoryController.deleteCategory);

export { router };
