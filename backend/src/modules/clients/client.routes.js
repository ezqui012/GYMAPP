import { Router } from "express";
import { createClient, deleteClient, getActiveClients, getClient, getClients, updateClient } from "./client.controller.js";
const router=Router();

router.get('/clients', getClients);
router.get('/client/:id', getClient);
router.get('/activeClients', getActiveClients);
router.post('/createClient', createClient);
router.put('/updateClient/:id', updateClient);
router.delete('/deleteClient/:id', deleteClient);
export default router;