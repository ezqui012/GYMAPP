import { Router } from "express";
import { createClient, getClient, getClients } from "./client.controller.js";
const router=Router();

router.get('/clients', getClients);
router.get('/client/:id', getClient);
router.post('/createClient', createClient);
export default router;