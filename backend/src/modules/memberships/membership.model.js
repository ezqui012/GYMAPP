import { pool } from "../../config/db.js";

export const getMemberships=async()=>{
    const memberships = await pool.query('SELECT * from membership');
    return memberships.rows;
}

export const getAMembership=async(id)=>{
    const membership=await pool.query('SELECT * from membership WHERE id_membership=$1', [id]);
    return membership.rows[0];
}

export const getMembershipHistory=async(id)=>{
    const memberships= await pool.query(`select m.id_membership, mt.name, m.init_date , m.end_date, mt.id_membership_type,
                                        case
                                            WHEN m.state = 'expirado' AND m.end_date >= CURRENT_DATE THEN 'anulado'
                                            WHEN m.state = 'expirado' AND m.end_date < CURRENT_DATE THEN 'expirado'
                                            else 'activo'
                                        end as state
                                        from client c left join membership m on c.id_client =m.id_client left join membership_type mt on mt.id_membership_type = m.id_membership_type 
                                        where c.id_client =$1
                                        ORDER BY m.init_date DESC`, [id]);
    return memberships.rows;
}

export const createMembership=async({init_date, end_date, state, id_membership_type, id_client})=>{
    const membership= await pool.query('INSERT INTO membership (init_date, end_date, state, id_membership_type, id_client)  VALUES($1, $2, $3, $4, $5) RETURNING *',[init_date, end_date, state, id_membership_type, id_client]);

    return membership.rows[0];

}

export const editMembership=async({id_membership, init_date, end_date, state, id_membership_type, id_client})=>{
    const {rowCount}= await pool.query('UPDATE membership SET init_date=$1, end_date=$2, state=$3, id_membership_type=$4, id_client=$5 WHERE id_membership=$6',
        [init_date, end_date, state, id_membership_type, id_client, id_membership]);
    return rowCount;
}
