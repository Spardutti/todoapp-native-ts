import { TodoController } from "../../controllers/todoController/TodoController";
import { Router } from "express";
import passport from "passport";

const router = Router();
const jwtProtected = passport.authenticate("jwt", { session: false });

/* GET ALL USER TODOS  */
router.get("/todos", jwtProtected, TodoController.getAllTodos);

/* GET SPECIFIC TODO */
router.get("/todo/:id", TodoController.getTodo);

/* GET TODO BY STATUS OR CATEGORY */
router.get("/todos/:category", TodoController.getTodosByCategory);

/* GET TODOS BY DATE */
router.get("/todos/:date", jwtProtected, TodoController.getTodosByDate);

/* GET TODAY TODOS */
router.get("/todaysTodos", jwtProtected, TodoController.getTodaysTodos);

/* GET UPCOMING TODOS */
router.get("/upcomingTodos", jwtProtected, TodoController.getUpcomingTodos);

/* GET OVERDUE TODOS */
router.get("/overdueTodos", jwtProtected, TodoController.getOverdueTodos);

/* GET COMPELTED TODOS */
router.get("/completed", jwtProtected, TodoController.getCompletedTodos);

/* GET LATEST TODOS */
router.get("/history", jwtProtected, TodoController.getLatestTodos);

export { router };
