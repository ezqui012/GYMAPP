import { Router } from "express";
import { createMembership, getMembership, getMemberships, updateMembership } from "./mebership.controller.js";
const router= Router();

router.get('/getMemberships', getMemberships);
router.get('/getMembership/:id', getMembership);
router.post('/createMembership', createMembership);
router.put('/updateMembership/:id', updateMembership);
export default router;