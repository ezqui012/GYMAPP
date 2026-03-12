import { pool } from "../../config/db.js";

export const getMemberships=async()=>{
    const memberships = await pool.query('SELECT * from membership');
    return memberships.rows;
}

export const getAMembership=async(id)=>{
    const membership=await pool.query('SELECT * from membership WHERE id_membership=$1', [id]);
    return membership.rows[0];
}

export const createMembership=async({init_date, end_date, is_active, id_membership_type, id_client})=>{
    const membership= await pool.query('INSERT INTO membership (init_date, end_date, is_active, id_membership_type, id_client)  VALUES($1, $2, $3, $4, $5) RETURNING *',[init_date, end_date, is_active, id_membership_type, id_client]);

    return membership.rows[0];

}

export const editMembership=async({id_membership, init_date, end_date, is_active, id_membership_type, id_client})=>{
    const {rowCount}= await pool.query('UPDATE membership SET init_date=$1, end_date=$2, is_active=$3, id_membership_type=$4, id_client=$5 WHERE id_membership=$6',
        [init_date, end_date, is_active, id_membership_type, id_client, id_membership]);
    return rowCount;
}
