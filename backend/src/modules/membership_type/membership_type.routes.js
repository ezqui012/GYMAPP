import { Router } from "express";
import { createMembershipType, disableMembershipType, getActiveMemberhipTypes, getInactiveMembershipTypes, getMembershipType, getMembershipTypes, updateMembershipType } from "./membership_type.controller.js";

const  router = Router();

router.get('/getMembershipTypes', getMembershipTypes);
router.get('/getMembershipType/:id', getMembershipType);
router.get('/activeMembershipTypes', getActiveMemberhipTypes);
router.get('/inactiveMembershipTypes', getInactiveMembershipTypes);

router.post('/createMembershipType', createMembershipType);
router.put('/updateMembershipType/:id', updateMembershipType);
router.delete('/disableMembershipType/:id', disableMembershipType);
export default router;

