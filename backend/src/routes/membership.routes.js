import { Router } from "express";
import { createMembership } from "../controllers/membership.controllers.js";

const router = Router();

router.post('/memberships/', createMembership);
export default router;