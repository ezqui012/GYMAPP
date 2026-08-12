import { Router } from "express";
import { createMembershipType, disableMembershipType, getActiveMemberhipTypes, getInactiveMembershipTypes, getMembershipType, getMembershipTypes, updateMembershipType } from "./membership_type.controller.js";
import { verifyAuth } from "../../middlewares/auth.middleware.js";

const  router = Router();

router.get('/getMembershipTypes', verifyAuth, getMembershipTypes);
router.get('/getMembershipType/:id', verifyAuth, getMembershipType);
router.get('/activeMembershipTypes', verifyAuth, getActiveMemberhipTypes);
router.get('/inactiveMembershipTypes', verifyAuth, getInactiveMembershipTypes);

router.post('/createMembershipType', createMembershipType);
router.put('/updateMembershipType/:id', updateMembershipType);
router.delete('/disableMembershipType/:id', disableMembershipType);
export default router;

