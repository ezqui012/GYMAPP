import { Router } from "express";
import { login, regist } from "./auth.controller.js";

const router=Router();

router.post('/registUser', regist);
router.get("/logUser", login);

export default router;