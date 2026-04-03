import * as userService from '../users/users.service.js'

export const getUsers=async(req, res)=>{
    try {
        const users = await userService.getUsers();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}

export const getUser=async(req, res)=>{
    try {
        const {id}= req.params;
        const user = await userService.getUser(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const registUser=async(req, res)=>{
    try {
        const {email,password, id_role}=req.body;
        console.log({email,password, id_role})
        const registeredUser= await userService.createAUser({email,password, id_role});
        res.status(201).json(registeredUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    
}