import { Router } from "express";
import { TaskController } from "../../controllers/taskController/TaskController";
import { validateNewTask } from "../../validations/TaskValidation";

const router = Router();

/* ADD TASK */
router.post("/newTask", /* validateNewTask, */ TaskController.addTask);

export { router };
