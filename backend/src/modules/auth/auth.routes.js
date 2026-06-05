import { Router } from "express";
import { login } from "./auth.controller.js";

const router=Router();

router.post("/logUser", login);

export default router;