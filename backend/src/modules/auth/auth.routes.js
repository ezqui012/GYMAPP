import { Router } from "express";
import { login } from "./auth.controller.js";
import { verifyAuth } from "../../middlewares/auth.middleware.js";

const router=Router();

router.get('/verify', verifyAuth ,(req, res)=>{
    res.json(req.user);
})

router.post("/login", login);
router.post('/logout', (req,res)=>{
    res.clearCookie('access_token');
    res.json({message: 'Session Cerrada'})
})
export default router;