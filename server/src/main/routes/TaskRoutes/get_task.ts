import { TaskController } from "../../controllers/taskController/TaskController";
import { Router } from "express";
const router = Router();

router.get("/tasks", TaskController.getAllTask);

router.get("/task/:id", TaskController.getTask);

router.get("/taskStatus/:status", TaskController.getTaskByStatus);

export { router };
