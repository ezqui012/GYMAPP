import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config/config.js";
import { getUser } from "../modules/users/users.controller.js";


export const verifyAuth=async(req, res, next)=>{
    const token =req.cookies.access_token;
    if(!token) return res.status(401).json({message: 'NO authorized'});

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.user= decoded;
        next()
    } catch (error) {
        return res.status(401).json({message: 'Token invalido'})
    }
}

function isAdmin(req,res, next){
    const logged= verifyCookie(req);
    if(logged) return next();
    return "/";
}

function isPublic(req, res, next){
    const logged= verifyCookie(req);
    if(!logged) return next();
    return "/login";
}

async function verifyCookie(req){
    try {
        const cookieJWT= req.headers.cookie.slice(13);
        const decoded=jwt.verify(cookieJWT, SECRET_JWT_KEY);
        const userToCheck= getUser(decoded.id_user);
        if(!userToCheck){
            return false
        }
        return true;
    } catch {
        return false
    }
}

export const methods={
    isAdmin,
    isPublic,
    verifyAuth
}