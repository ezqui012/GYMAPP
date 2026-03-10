import { pool } from "../../config/db";

export const getMemberships=async()=>{
    return await pool.query('SELECT * from membership');
}

export const getAMemberships=async(id)=>{
    const membership=await pool.query('SELECT * from membership WHERE id_membership=$1', [id]);
    return membership;
}

export const createMembership=async({initDate, endDate, isActive, idMembershipType, idClient})=>{
    const membership= await pool.query('INSERT INTO membership  VALUES($1, $2, $3, $4, 5$)',[initDate, endDate, isActive, id_membership_type, idClient]);

    return membership.rows[0];

}

export const editMembership=async({id, initDate, endDate, isActive, id_membership_type, idClient})=>{
    const {rowCount}= await pool.query('UPDATE membership SET init_date=$1, end_date=$2, is_active=$3, id_membership_type=$4, $id_client=$5 WHERE id_membership=6',
        [initDate, endDate, isActive, id_membership_type, idClient, id]);
    return rowCount;
}

