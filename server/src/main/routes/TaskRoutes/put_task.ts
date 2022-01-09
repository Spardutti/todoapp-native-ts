import { TaskController } from "../../controllers/taskController/TaskController";
import { Router } from "express";
import { validateNewTask } from "../../validations/TaskValidation";

const router = Router();

router.put("/putTask/:id", validateNewTask, TaskController.putTask);

export { router };
