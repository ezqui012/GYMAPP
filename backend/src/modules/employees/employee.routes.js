import { Router } from "express";
import { createEmployee, getEmployee, getEmployees, updateEmployee } from "./employee.controller.js";
const router=Router();

router.get('/employees', getEmployees);
router.get('/employee/:id', getEmployee);
router.post('/createEmployee', createEmployee);
router.put('/updateEmployee/:id', updateEmployee);

export default router;