import { Router } from "express";
import { createMembershipType, deleteMembershipType, getAMembershipType, getMembershipTypes, updateMembershipType } from "../controllers/membership_type.controllers.js";

const router=Router();

router.get("/membership_types", getMembershipTypes);
router.get("/membership_types/:id", getAMembershipType);
router.post("/membership_types/", createMembershipType);
router.put("/membership_types/:id", updateMembershipType);
router.delete("/membership_types/:id", deleteMembershipType);
export default router;
