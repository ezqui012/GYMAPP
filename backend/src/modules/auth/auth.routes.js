import { Router } from "express";
import { login } from "./auth.controller.js";

const router=Router();

router.get("/logUser", login);

export default router;