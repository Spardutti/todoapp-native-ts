import { TaskController } from "../../controllers/taskController/TaskController";
import { Router } from "express";
const router = Router();

router.delete("/task/:id", TaskController.deleteTask);

export { router };
