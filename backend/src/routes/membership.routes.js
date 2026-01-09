import { Router } from "express";
import { createMembership, getAMembership, getMemberships, updateMembership } from "../controllers/membership.controllers.js";

const router = Router();

router.get('/memberships', getMemberships);

router.get('/memberships/:id', getAMembership);

router.post('/memberships/', createMembership);

router.put('/memberships/:id', updateMembership);



export default router;