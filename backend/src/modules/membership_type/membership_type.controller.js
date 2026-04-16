import * as membershipTypeService from './membership_type.service.js';

export const getMembershipTypes=async(req, res)=>{
    try {
        const membershipTypes= await membershipTypeService.getMemberships();
        res.status(200).json(membershipTypes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getActiveMemberhipTypes=async(req, res)=>{
    try {
        const data = await membershipTypeService.getActiveMembershipTypes();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getInactiveMembershipTypes=async(req,res)=>{
    try {
        const data = await membershipTypeService.getInactiveMembershipTypes();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getMembershipType=async(req, res)=>{
    try {
        const {id}= req.params;
        const membershipType= await membershipTypeService.getMembership(id);
        res.json(membershipType);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createMembershipType=async(req, res)=>{
    try {
        const {name, description, duration, price}= req.body;
        const membership=await membershipTypeService.createMembershipType({name, description, duration, price});
        
        res.status(201).json(membership);
    } catch (error) {
        const status=error.message==='Membership Type is already created' ? 400:500;
        console.log(error)
        res.status(status).json({message: error.message})
    }
}

export const updateMembershipType=async(req, res)=>{
    try {
        const {id} = req.params;
        const {name, description, duration, price}=req.body;
        const membershipTypeUpdated= await membershipTypeService.updateMembershipType({id, name, description, duration, price});
        if (membershipTypeUpdated === 0) return res.status(404).json({ message: "User not found" });

        json({message: "Operation done sucessfully"});

    } catch (error) {   
        res.status(500).json({message: error.message})
    }
}

export const disableMembershipType=async(req,res)=>{
    try {
        const {id}= req.params;
        await membershipTypeService.disableMembershipType(id);
        res.status(204).json({message: "Operation Sucessfully"})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}