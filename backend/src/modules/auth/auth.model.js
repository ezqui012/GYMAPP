import { pool } from "../../config/db.js";


export const login =async({name, email})=>{
    const user= await pool.query('SELECT name, email FROM users WHERE name=$1 and email=$2', [name, email]);
    return user.rows[0];
}

export const findUserByEmail=async({email})=>{
    const userData= await pool.query(`select u.id_user, p.name, u.password, p.email, r.id_role from users u left join employee e on e.id_employee = u.id_user 
                                      left join person p on p.id_person =e.id_employee left join "role" r on r.id_role = u.id_role  
                                      where email=$1`, [email])
    return userData.rows[0];
}