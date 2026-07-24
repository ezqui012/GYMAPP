import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config/config.js';
import { getUserBydId } from '../modules/users/users.model.js';

export const checkRole=(roles)=>async(req, res, next)=>{
    try {
        const token = req.cookies.access_token;
        const tokenData= jwt.verify(token, SECRET_JWT_KEY);
        if(!token)throw new Error("invalid token");
        const userData = await getUserBydId(tokenData.id_user);
        if([].concat(roles).includes(userData.id_role)){
            next();
        }else{
            res.status(409);
            res.send({error: 'No permisos'});
        }
        

    } catch (error) {
        return error
    }
}