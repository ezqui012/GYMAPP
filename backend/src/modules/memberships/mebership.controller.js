import * as membershipService from './membership.service.js';

export const getMemberships=async(req, res)=>{
    try {
        const memberships= await membershipService.getMemberships();
        res.json(memberships);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getMembership=async(req, res)=>{
    try {
        const {id}=req.params;
        const membership= await membershipService.getMembership(id);
        if(!membership) throw new Error("Data does not exist");
        
        res.json(membership);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getMembershipHistory=async(req, res)=>{
    try {
        const {id}= req.params;
        const memberships = await membershipService.getMembershipHistory(parseInt(id));
        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createMembership=async(req, res)=>{
    try {
        const {init_date, end_date, state, id_membership_type, id_client}=req.body;
        const membership = await membershipService.createMembership({init_date, end_date, state, id_membership_type, id_client})

        res.status(201).json(membership);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const updateMembership=async(req, res)=>{
    try {
        const {id} = req.params;
        const id_membership=id;
        const {init_date, end_date, state, id_membership_type, id_client}= req.body;
        const updated=await membershipService.updateMembership({id_membership, init_date, end_date, state, id_membership_type, id_client});
        if(updated===0) return res.status(404).json({ message: "User not found" });
        res.json("data updated")
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const changeMembership=async(req, res)=>{
    try {
        const {id_membership, membership}=req.body;
        const init_date=membership.init_date;
        const end_date=membership.end_date;
        const id_membership_type=membership.id_membership_type;
        const id_client=membership.id_client;
        console.log(id_client)
        const changed=await membershipService.changeMembership({id_membership, init_date, end_date, id_membership_type, id_client});
        if(changed===0) return res.status(404).json({ message: "mem not found" });
        res.status(201).json('Membership created');
    } catch (error) {
        res.status(500).json({message: error.message}); 
    }
}

export const cancelMembership =async(req,res)=>{
    try {
        const {id}=req.params;
        const canceledMembership= await membershipService.cancelMembership(id);
        res.json("Membership canceled");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}