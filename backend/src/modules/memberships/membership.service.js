import * as membershipModel from './membership.model.js'

export const getMemberships=async()=>{
    return await membershipModel.getMemberships();
}

export const getMembership=async(id)=>{
    const membership = await membershipModel.getAMembership(id);
    return membership;
}

export const getMembershipHistory=async(id)=>{
    try {
        const memberships = await membershipModel.getMembershipHistory(id);
    if(!memberships){
        const error = new Error('Data does not exist');
        error.status = 404
        throw error;
    }
    return memberships;
    } catch (error) {
        console.log(error)
    }
    
}

export const createMembership=async({init_date, end_date, state, id_membership_type, id_client})=>{
    const membership = await membershipModel.createMembership({init_date, end_date, state, id_membership_type, id_client});
    return membership;
}


export const updateMembership=async({id_membership, init_date, end_date, state, id_membership_type, id_client})=>{
    console.log({id_membership, init_date, end_date, state, id_membership_type, id_client})
    const updated= await membershipModel.editMembership({id_membership, init_date, end_date, state, id_membership_type, id_client})
    //console.log(updated)
    if(!updated) throw new Error("Error updating data");
    return updated;
}

export const changeMembership=async({id_membership, init_date, end_date, id_membership_type, id_client})=>{
    const changed= await membershipModel.changeMembership({id_membership, init_date, end_date, id_membership_type, id_client});
    if(!changed) throw new Error("Error updating data");
    return changed;
}
export const cancelMembership=async(id_membership)=>{
    const membershipCanceled= await membershipModel.cancelMembership(id_membership);
    if(!membershipCanceled) throw new error("Error fetching data");
    return membershipCanceled;
}