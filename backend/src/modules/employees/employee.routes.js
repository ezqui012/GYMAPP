import { Router } from "express";
import { createEmployee, deleteEmployee, getEmployee, getEmployeeEmailsWhioutUser, getEmployees, updateEmployee } from "./employee.controller.js";
import { verifyAuth } from "../../middlewares/auth.middleware.js";
const router=Router();

router.get('/employees', verifyAuth, getEmployees);
router.get('/employee/:id', verifyAuth, getEmployee);
router.get('/employeEmailsWhitoutUser',  getEmployeeEmailsWhioutUser)

router.post('/createEmployee', createEmployee);
router.put('/updateEmployee/:id', updateEmployee);
router.delete('/deleteEmployee/:id', deleteEmployee);
export default router;