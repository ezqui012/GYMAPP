import * as clientService from './client.service.js';


export const getClient=async(req,res)=>{
    try {
        const {id}= req.params;
        const client = await clientService.getClient(id);
        if(!client) throw new Error("Client not found");
        res.json(client);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getClients=async(req, res)=>{
    try {
        const clients= await clientService.getAllClients();
        res.json(clients);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createClient=async(req,res)=>{
    try {
        const {name, lastname, phone, photo, ci, nit, email}=req.body;
        console.log(req.body)
        const newClient= await clientService.createClient({name, lastname, phone, photo, ci, nit, email});
        
        res.status(201).json(newClient)
    } catch (error) {
        const status=error.message==='Email is already used' ? 400:500;
        console.log(error)
        res.status(status).json({message: error.message})
    }
}