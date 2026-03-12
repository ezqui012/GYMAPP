import * as membershipModel from './membership.model.js'

export const getMemberships=async()=>{
    return await membershipModel.getMemberships();
}

export const getMembership=async(id)=>{
    const membership = await membershipModel.getAMembership(id);
    return membership;
}

export const createMembership=async({init_date, end_date, is_active, id_membership_type, id_client})=>{
    const membership = await membershipModel.createMembership({init_date, end_date, is_active, id_membership_type, id_client});
    return membership;
}

export const updateMembership=async({id_membership, init_date, end_date, is_active, id_membership_type, id_client})=>{
    console.log({id_membership, init_date, end_date, is_active, id_membership_type, id_client})
    const updated= await membershipModel.editMembership({id_membership, init_date, end_date, is_active, id_membership_type, id_client})
    //console.log(updated)
    if(!updated) throw new Error("Error updating data");
    return updated;
}

