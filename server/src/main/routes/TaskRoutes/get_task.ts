import { TaskController } from "../../controllers/taskController/TaskController";
import { Router } from "express";
import passport from "passport";

const router = Router();
const jwtProtected = passport.authenticate("jwt", { session: false });

/* GET ALL TASKS  */
router.get("/tasks", jwtProtected, TaskController.getAllTask);

/* GET SPECIFIC TASK */
router.get("/task/:id", TaskController.getTask);

/* GET TASK BY STATUS OR CATEGORY */
router.get("/getTaskBy", TaskController.getTaskByStatus);

export { router };
