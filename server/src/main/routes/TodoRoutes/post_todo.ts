import { Router } from "express";
import { TodoController } from "../../controllers/todoController/TodoController";
import { validateNewTodo } from "../../validations/TodoValidations";
import passport from "passport";

const jwtProtected = passport.authenticate("jwt", { session: false });

const router = Router();

/* ADD TODO */
router.post(
  "/newTodo",
  jwtProtected,
  validateNewTodo,
  TodoController.addTodo
);

export { router };
