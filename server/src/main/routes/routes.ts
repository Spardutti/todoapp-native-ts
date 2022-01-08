import { Router } from "express";
const router = Router();

/* TASKS */
import { router as postTask } from "./TaskRoutes/post_task";
import { router as getTasks } from "./TaskRoutes/get_task";

router.use(postTask);
router.use(getTasks);

/* CATEGORIES */
import { router as postCategories } from "./CategoryRoutes/post_category";
import { router as getCategories } from "./CategoryRoutes/get_category";

router.use(postCategories);
router.use(getCategories);

export { router };
