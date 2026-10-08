import { Router } from "express";
import { permissionController } from "../controllers/permission.controller";

const router = Router();

router.get("/", permissionController);

export default router;