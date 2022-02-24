import { TodoController } from "../../controllers/todoController/TodoController";
import { Router } from "express";
import { validateNewTodo } from "../../validations/TodoValidations";

const router = Router();

router.put(
  "/todo/:id",
  /*  validateNewTodo, */ TodoController.toggleIsCompleted
);

router.put("/editTodo", TodoController.editTodo);

export { router };
