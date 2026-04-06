import { pool } from "../../config/db.js";
export const getUsers=async()=>{
    try {
        const users= await pool.query(
                `SELECT u.id_user, p.name, p.lastname, p.phone, p.email, p.nit  
                FROM users u left join employee e left join person p ON p.id_person=e.id_employee ON e.id_employee=u.id_user`);
        console.log(users.rows)
        return users.rows;
    } catch (error) {
        console.log(error)
    }
    
}

export const getUserBydId=async(id)=>{
    const user= await pool.query(
        `SELECT u.id_user, p.name, p.lastname, p.phone, p.email, p.nit  
        FROM users u left join employee e left join person p ON p.id_person=e.id_employee ON e.id_employee=u.id_user where u.id_user= $1`, [id]);
    return user.rows[0];
}

export const createUser=async({id_user, password, id_role})=>{
    const user = await pool.query(`INSERT INTO users (id_user, password, id_role) VALUES($1,$2,$3) RETURNING *`, [id_user,password,id_role]);
    return user.rows[0]
}