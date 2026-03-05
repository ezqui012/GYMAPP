import { SALT_ROUNDS } from "../../config/config.js";
import { pool } from "../../config/db.js";
import bcrypt  from 'bcrypt';


export const regist = async({name, password, email, id_employee, id_role})=>{
    const hashedPassword= await bcrypt.hash(password, SALT_ROUNDS);

    const user= await pool.query('INSERT INTO users (name, email, password, id_employee, id_role) VALUES ($1,$2,$3,$4,$5) RETURNING id_user', 
        [name, 
        email, 
        hashedPassword, 
        id_employee, 
        id_role
    ]);

    return user.rows[0]
}