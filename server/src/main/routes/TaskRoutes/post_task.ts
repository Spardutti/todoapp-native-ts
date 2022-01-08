import { Router } from "express";
import { TaskController } from "../../controllers/taskController/TaskController";
const router = Router();

/* ADD TASK */
router.post("/newTask", TaskController.addTask);

export { router };
