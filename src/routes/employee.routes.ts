import { Router } from "express";

import {
  getEmployees,
  getEmployee,
  createNewEmployee,
  updateExistingEmployee,
  deleteExistingEmployee,
} from "../controllers/employee.controllers";

import authMiddleware from "../middleware/authentication.middleware";

const router = Router();

router.get("/", authMiddleware, getEmployees);

router.get("/:id", authMiddleware, getEmployee);

router.post("/", authMiddleware, createNewEmployee);

router.put("/:id", authMiddleware, updateExistingEmployee);

router.delete("/:id", authMiddleware, deleteExistingEmployee);

export default router;