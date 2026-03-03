import * as authService from './auth.model.js'



export const regist= async(req, res)=>{
    try {
        const {name, password, email, id_employee, id_role}= req.body;
        const newUser= await authService.regist({name, password, email, id_employee, id_role});

        res.status(201).json(newUser);        
    } catch (error) {
        const status= error.message ==='El email ya esta regitrado' ? 400: 500
        res.status(status).json({message: error.message})
    }
}

