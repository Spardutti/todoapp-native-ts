import { DevController } from "../../controllers/devController/DevController";
import { Router } from "express";

const router = Router();

router.put("/editDbUsers", DevController.editCreatedUsers)

export { router };