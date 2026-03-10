import { Router } from "express";
import { createMembershipType, deleteMembershipType, getMembershipType, getMembershipTypes, updateMembershipType } from "./membership_type.controller.js";

const  router = Router();

router.get('/getMembershipTypes', getMembershipTypes);
router.get('/getMembershipType/:id', getMembershipType);
router.post('/createMembershipType', createMembershipType);
router.put('/updateMembershipType/:id', updateMembershipType);
router.delete('/deleteMembershipType/:id', deleteMembershipType);
export default router;

