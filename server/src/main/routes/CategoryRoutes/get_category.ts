import { Router } from "express";
import { CategoryController } from "../../controllers/categoryController/CategoryController";

const router = Router();

router.get("/categories", CategoryController.getAllCategories);

router.get("/category/:id", CategoryController.getCategory);

export { router };
