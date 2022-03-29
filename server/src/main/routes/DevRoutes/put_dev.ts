import { DevController } from "../../controllers/devController/DevController";
import { Router } from "express";

const router = Router();

router.put("/editDbUsers", DevController.editCreatedUsers);
router.put("/editDbTodos", DevController.editCreatedTodos);

export { router };
