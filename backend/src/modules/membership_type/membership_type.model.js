import {pool} from '../../config/db.js';

export const getMembershipTypes= async()=>{
    const memberships= await pool.query('SELECT * from membership_type');
    return memberships.rows;
}

export const getActiveMembershipTypes=async()=>{
    const memberships= await pool.query('SELECT * from membership_type WHERE is_active=true');
    return memberships.rows;
}

export const getInactiveMembershipTypes=async()=>{
    const memberships = await pool.query('SELECT * from membership_type WHERE is_active=false');
    return memberships.rows;
}

export const getAMembershipType=async(id)=>{
    const membershipType= await pool.query('SELECT * from membership_type WHERE id_membership_type=$1',[id]);
    return membershipType.rows[0];
}

export const createMembershipType=async({name, description, duration, price})=>{
        const membership=await pool.query('INSERT INTO membership_type (name, description, duration, price) VALUES($1, $2, $3, $4) RETURNING *' , [name, description, duration, price]);
        return membership.rows[0];
}

export const updateMembershipType=async({id, name, description, duration, price})=>{
    const {rowCount}= await pool.query('UPDATE membership_type SET name=$1, description=$2, duration=$3, price=$4 WHERE id_membership_type=$5',
        [name, description, duration, price, id]);
    
    return rowCount;
}

export const disableMembershipType=async(id)=>{
    const {rowCount}= await pool.query('UPDATE membership_type SET is_active=false WHERE id_membership_type=$1 AND is_active=true', [id]);
    return rowCount;
}

export const findByName=async(name)=>{
    const rows= await pool.query('SELECT name from membership_type where name=$1',[name]);
    return rows;
}