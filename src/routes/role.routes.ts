import { Router } from "express";
import { roleController } from "../controllers/role.controller";

const router = Router();

router.get("/", roleController);

export default router;