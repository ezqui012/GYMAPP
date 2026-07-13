import * as authModel from './auth.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../../config/config.js';

export const logUser= async({email, password})=>{
    Validation.password(password);

    const userData= await authModel.findUserByEmail({email});
    if(!userData)throw new Error("user does not exist");
    const isValid= await bcrypt.compare(password, userData.password);
    
    if(!isValid)throw new Error("invalid credentials");
    
    const token =jwt.sign(
        { id_user: userData.id_user, 
          username: userData.name,
          email: userData.email,
          id_role: userData.id_role
        },
        SECRET_JWT_KEY,
        {
            expiresIn: '1h'
        }
    );
    
    return {userData, token};
}

// export const verifyAuth=async(email, password)=>{
//     const userExist= await authModel.findUserByEmail(email);

//     if(!userExist)throw new Error("User does not exist");

//     const hashedPassword = await jwt.compare(password, userExist.password);

//     if(hashedPassword)throw new Error("Incorrect credentials try again");

    
    
    
// }


class Validation{
    static name (name){
        if(typeof name!=='string')throw new Error("Username must be string");
        if(name.length<3)throw new Error("username must contain al teas 3 characters long");
    }
    static password (password){
         if(typeof password!=='string') throw new Error("password must be string");
        if(password.length<6)throw new Error("Password must contain al teas 6 characters long");
    }
}
