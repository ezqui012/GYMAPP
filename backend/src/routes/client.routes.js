import { Router } from "express";
import { createClient, deleteClient, getClient, getClients, updateClient } from "../controllers/client.controllers.js";

const router = Router();

router.get("/clients", getClients);

router.get("/clients/:id", getClient);

router.post("/clients/", createClient);

router.put("/clients/:id", updateClient);

router.delete("/clients/:id", deleteClient );
    
export default router;
