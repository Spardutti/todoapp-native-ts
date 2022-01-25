import { Router } from "express";
const router = Router();

/* TASKS */
import { router as postTask } from "./TaskRoutes/post_task";
import { router as getTasks } from "./TaskRoutes/get_task";
import { router as deleteTask } from "./TaskRoutes/delete_task";
import { router as putTask } from "./TaskRoutes/put_task";

router.use(postTask);
router.use(getTasks);
router.use(deleteTask);
router.use(putTask);

/* CATEGORIES */
import { router as postCategories } from "./CategoryRoutes/post_category";
import { router as getCategories } from "./CategoryRoutes/get_category";
import { router as deleteCategories } from "./CategoryRoutes/delete_category";
import { router as putCategories } from "./CategoryRoutes/put_category";

router.use(postCategories);
router.use(getCategories);
router.use(deleteCategories);
router.use(putCategories);

/* USER */
import { router as postUser } from "./UserRoutes/post_user";
import { router as getUser } from "./UserRoutes/get_user";

router.use(postUser);
router.use(getUser);

export { router };
