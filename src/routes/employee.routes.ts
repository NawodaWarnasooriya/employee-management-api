import { Router } from "express";

import {
  getEmployees,
  getEmployee,
  createNewEmployee,
  updateExistingEmployee,
  deleteExistingEmployee,
} from "../controllers/employee.controllers";

const router = Router();

router.get("/", getEmployees);

router.get("/:id", getEmployee);

router.post("/", createNewEmployee);

router.put("/:id", updateExistingEmployee);

router.delete("/:id", deleteExistingEmployee);

export default router;