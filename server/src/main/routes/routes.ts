import { Router } from "express";
const router = Router();

/* TODOS */
import { router as postTodo } from "./TodoRoutes/post_todo";
import { router as getTodos } from "./TodoRoutes/get_todo";
import { router as deleteTodo } from "./TodoRoutes/delete_todo";
import { router as putTodo } from "./TodoRoutes/put_todo";

router.use(postTodo);
router.use(getTodos);
router.use(deleteTodo);
router.use(putTodo);

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
import { router as putUser} from "./UserRoutes/put_user"

router.use(postUser);
router.use(getUser);
router.use(putUser)

/* DEV */
import { router as putDev } from "./DevRoutes/put_dev";

router.use(putDev);

export { router };
