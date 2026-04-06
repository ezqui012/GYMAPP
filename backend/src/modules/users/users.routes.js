import { Router } from "express";
import { getUser, getUsers, registUser } from "./users.controller.js";

const router = Router();

router.get('/getUsers', getUsers);
router.get('/getUser/:id', getUser);
router.post('/registUser', registUser);

export default router;