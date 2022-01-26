import { Router } from "express";
import { TaskController } from "../../controllers/taskController/TaskController";
import { validateNewTask } from "../../validations/TaskValidation";
import passport from "passport";

const jwtProtected = passport.authenticate("jwt", { session:false })

const router = Router();


/* ADD TASK */
router.post("/newTask", jwtProtected, /* validateNewTask, */ TaskController.addTask);

export { router };
