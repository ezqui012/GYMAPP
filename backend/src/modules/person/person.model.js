import { pool } from "../../config/db.js";

export const getAllPersons=async()=>{
    const persons = await pool.query(`Select * from person`);
    return persons.rows;
}

export const getPersonById=async(id)=>{
    const person = await pool.query('Select * from person p where p.id_person=$1', [id]);
    return person.rows[0];
}

export const getPersonByEmail=async(email)=>{
    const person = await pool.query('Select * from person p where p.email=$1',[email]);
    return person.rows[0];
}