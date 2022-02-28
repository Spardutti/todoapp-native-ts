import { TodoController } from "../../controllers/todoController/TodoController";
import { Router } from "express";
const router = Router();

router.delete("/todo/:id", TodoController.deleteTodo);

export { router };
