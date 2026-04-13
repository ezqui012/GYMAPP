import { Router } from "express";
import { createClient, softDeleteClient, getActiveClients, getClient, getClients, updateClient, getSoftDeletedClients, getInactiveClients } from "./client.controller.js";
const router=Router();

router.get('/clients', getClients);
router.get('/client/:id', getClient);
router.get('/activeClients', getActiveClients);
router.get('/getSoftDeletedClients', getSoftDeletedClients);
router.get('/inactiveClients', getInactiveClients);

router.post('/createClient', createClient);
router.put('/updateClient/:id', updateClient);
router.delete('/softDeleteClient/:id', softDeleteClient);
export default router;