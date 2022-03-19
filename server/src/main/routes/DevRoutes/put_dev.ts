import { DevController } from "../../controllers/devController/DevController";
import { Router } from "express";

const router = Router();

router.put("/editdbusers/:id", DevController.editCreatedUsers)

export { router };