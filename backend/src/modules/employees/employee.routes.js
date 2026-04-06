import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployee, getEmployeeEmailsWhioutUser, getEmployees, updateEmployee } from "./employee.controller.js";
const router=Router();

router.get('/employees', getEmployees);
router.get('/employee/:id', getEmployee);
router.get('/employeEmailsWhitoutUser', getEmployeeEmailsWhioutUser)

router.post('/createEmployee', createEmployee);
router.put('/updateEmployee/:id', updateEmployee);
router.delete('/deleteEmployee/:id', deleteEmployee);
export default router;