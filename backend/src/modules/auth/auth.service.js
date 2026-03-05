import * as authController from './auth.model.js';

export const registUser= async({username, password, email, id_employee, id_role})=>{
    Validation.username(username);
    Validation.password(password);
    const checkUser = await pool.query(`SELECT name FROM users WHERE name=$1`,[username]);
    if(checkUser)throw new Error("Username already Exist");

    return await authController.regist({username, password, email, id_employee, id_role});
}

class Validation{
    static username (username){
        if(typeof username!=='string')throw new Error("Username must be string");
        if(username.length<3)throw new Error("username must contain al teas 3 characters long");
    }
    static password (password){
         if(typeof password!=='string') throw new Error("password must be string");
        if(password.length<6)throw new Error("Password must contain al teas 6 characters long");
    }
}
