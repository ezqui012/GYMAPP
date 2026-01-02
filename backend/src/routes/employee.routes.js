import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from "../controllers/employee.controllers.js";

const router = Router();

router.get("/employees", getEmployees);

router.get("/employees/:id", getEmployee);

router.post("/employees", createEmployee);

router.put("/employees/:id", updateEmployee);

router.delete("/employees/:id", deleteEmployee);

export default router;