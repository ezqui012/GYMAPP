import { Router } from "express";
import { createClient, softDeleteClient, getActiveClients, getClient, getClients, updateClient, getSoftDeletedClients, getInactiveClients, getClientsByMembershipState, getAClientByMembershipState } from "./client.controller.js";
import { methods as authorization } from "../../middlewares/auth.middleware.js";
import { verifyAuth } from "../../middlewares/auth.middleware.js";
import { checkRole } from "../../middlewares/verifyRole.middleware.js";
const router=Router();

router.get('/clients', verifyAuth,checkRole([0]), getClients);
router.get('/client/:id', getClient);
router.get('/activeClients', verifyAuth, getActiveClients);
router.get('/getSoftDeletedClients',verifyAuth , getSoftDeletedClients);
router.get('/inactiveClients' ,getInactiveClients);
router.get('/clientsByMembershipState', verifyAuth ,getClientsByMembershipState);
router.get('/clientByMembershipState/:id', verifyAuth, getAClientByMembershipState)

router.post('/createClient', createClient);
router.put('/updateClient/:id', updateClient);
router.delete('/softDeleteClient/:id', softDeleteClient);
export default router;