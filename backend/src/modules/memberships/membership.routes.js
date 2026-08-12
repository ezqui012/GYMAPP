import { Router } from "express";
import { cancelMembership, changeMembership, createMembership, getMembership, getMembershipHistory, getMemberships, updateMembership } from "./mebership.controller.js";
import { verifyAuth } from "../../middlewares/auth.middleware.js";
import { checkRole } from "../../middlewares/verifyRole.middleware.js"
const router= Router();

router.get('/getMemberships', getMemberships);
router.get('/getMembership/:id', getMembership);
router.get('/membershipHistory/:id', getMembershipHistory);

router.post('/createMembership', createMembership);
router.post('/changeMembership', changeMembership);

router.put('/updateMembership/:id', updateMembership);
router.put('/cancelMembership/:id', cancelMembership);
export default router;