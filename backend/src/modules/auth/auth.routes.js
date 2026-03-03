import { Router } from "express";
import { regist } from "./auth.controller.js";

const router=Router();

router.post('/registUser', regist);
//router.get("/login", );

export default router;