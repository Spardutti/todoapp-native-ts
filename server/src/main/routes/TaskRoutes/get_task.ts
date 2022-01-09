import { TaskController } from "../../controllers/taskController/TaskController";
import { Router } from "express";
const router = Router();

router.get("/tasks", TaskController.getAllTask);

router.get("/task/:id", TaskController.getTask);

/* GET TASK BY STATUS OR CATEGORY */
router.get("/getTaskBy", TaskController.getTaskByStatus);

export { router };
