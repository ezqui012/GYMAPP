import * as membershipTypeModel from './membership_type.model.js'

export const getMemberships=async()=>{
    return await membershipTypeModel.getMembershipTypes();
}

export const getActiveMembershipTypes=async()=>{
    const data=await membershipTypeModel.getActiveMembershipTypes();
    if(!data){
        const error = new Error('Data does not exist');
        error.status = 404
        throw error;
    }
    return data;
}

export const getInactiveMembershipTypes=async()=>{
    const data=await membershipTypeModel.getInactiveMembershipTypes();
    if(!data){
        const error = new Error('Data does not exist');
        error.status = 404
        throw error;
    }
    return data;
}

export const getMembership=async(id)=>{
    const membershipType= await membershipTypeModel.getAMembershipType(id);
    if(!membershipType)throw new Error("Membership does not exist");

    return membershipType;
}

export const createMembershipType=async({name, description, duration, price})=>{
    const nameExist= await membershipTypeModel.findByName(name);
    console.log(name)
    if(!nameExist) throw new Error("Name already exist");
    
    const membership= await membershipTypeModel.createMembershipType({name, description, duration, price});
    
    return membership;
}

export const updateMembershipType=async({id, name, description, duration, price})=>{

    const updateMembershipType= await membershipTypeModel.updateMembershipType({id, name, description, duration, price});
    if(!updateMembershipType) throw new Error("Error updating data");

    return updateMembershipType;

}

export const disableMembershipType=async(id)=>{
    const disabledMembershipType = await membershipTypeModel.disableMembershipType(id);
    console.log(id)
    if(!disabledMembershipType){
        const error = new Error('Data does not exist');
        error.status = 404
        throw error;
    };
    
    return disabledMembershipType;
}