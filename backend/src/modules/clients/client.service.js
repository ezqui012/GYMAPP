import * as clientModel from './client.model.js'

export const getAllClients=async()=>{
    return await clientModel.getClients();
}
export const getActiveClients=async()=>{
    return await clientModel.activeClients();
}

export const getInactiveClients = async()=>{
    return await clientModel.inactiveClients();
}

export const getSoftDeletedClients = async()=>{
    return await clientModel.softDeletedClients();
}

export const getClient=async(id)=>{
    const client = await clientModel.getClient(id);
    if(!client) throw new Error("Client not found ");
    return client;
}

export const createClient=async({name, lastname , phone, photo , ci, nit, email})=>{
    
    const verifyUser=await clientModel.findClientByEmail(email); 

    if(!verifyUser) throw new Error("Email is already used");
    
    const clientData=await clientModel.createClient({name, lastname,phone, photo, ci, nit, email});
    return clientData;
}

export const updateClient=async({id, name, lastname, phone, photo,ci,nit, email})=>{
    
    const clientUpdated= await clientModel.updateClient({id,name,lastname,phone,photo,ci,nit,email});
    if(!clientUpdated) throw new Error("Error updating data");
    return clientUpdated;
}

export const softDeleteClient=async(id)=>{
    const isDeleted=await clientModel.softDeleteClient(id);
    if(!isDeleted){
        const error = new Error('client does not exist');
        error.status = 404
        throw error
    }
    return isDeleted;
}