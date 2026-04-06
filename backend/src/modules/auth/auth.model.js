import { pool } from "../../config/db.js";


export const login =async({name, email})=>{
    const user= await pool.query('SELECT name, email FROM users WHERE name=$1 and email=$2', [name, email]);
    return user.rows[0];
}

export const findUser=async({name, email})=>{
    const userData= await pool.query('SELECT from users WHERE name=$1 && email=$2', [name, email])
    return userData.rows[0];
}