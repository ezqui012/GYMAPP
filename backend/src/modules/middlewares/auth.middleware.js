import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../../config/config.js";
import { getUser } from "../users/users.controller.js";
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
    isPublic
}