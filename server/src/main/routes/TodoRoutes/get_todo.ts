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
router.get("/getTodoBy", TodoController.getTodoByStatus);

/* GET TODOS BY DATE */
router.get(
  "/getTodosByDate/:date",
  jwtProtected,
  TodoController.getTodosByDate
);

export { router };
