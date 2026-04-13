import { pool } from "../../config/db.js";


//get all clients active, inactive,
export const getClients=async()=>{
    const clients = await pool.query("SELECT p.* FROM person p INNER JOIN client c ON c.id_client=p.id_person");
    return clients.rows
}
//get active clients with an active membership
export const activeClients=async()=>{
    const clients = await pool.query(`SELECT c.id_client, p.name, p.lastname, p.ci, p.email, m.end_date from (person p inner join client c on p.id_person =c.id_client) 
                                    inner join membership m on m.id_client=c.id_client where m.is_active =true`);
    return clients.rows;
}

//get inactive clients 
export const inactiveClients=async()=>{
    const clients = await pool.query(`SELECT DISTINCT c.id_client, p.name, p.lastname, p.ci, p.email from (person p inner join client c on p.id_person =c.id_client) 
                                    inner join membership m on m.id_client=c.id_client where m.is_active =false AND c.id_client NOT IN (
                                    SELECT id_client FROM membership WHERE is_active = true)`);
    return clients.rows;
}

export const softDeletedClients=async()=>{
    const clients = await pool.query(`SELECT c.id_client, p.name, p.lastname, p.ci, p.nit, p.photo, p.email from person p inner join client c on p.id_person =c.id_client 
                                     where c.is_deleted=true`);

    return clients.rows;
}

export const getClient= async(id)=>{
    const client  = await pool.query(`SELECT p.* FROM person p INNER JOIN client c ON c.id_client=p.id_person  WHERE c.id_client=$1`,[id]);
    return client.rows[0];

}

export const createClient =async({name, lastname, phone,photo, ci, nit, email})=>{
   
    const clientData = await pool.query(`INSERT INTO person (name, lastname, phone, photo, ci, nit, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_person`,
          [
            name,
            lastname,
            phone,
            photo,
            ci,
            nit,
            email,
          ]
        );
    const clientId = clientData.rows[0].id_person;
    await pool.query(`INSERT INTO client (id_client) VALUES ($1)`, [clientId]);
    return clientData.rows[0];
}


export const updateClient=async({id, name, lastname, phone, photo, ci, nit, email})=>{
    const { rowCount } = await pool.query(`UPDATE person SET name='${name}', lastname='${lastname}',
        phone='${phone}', photo='${photo}', ci='${ci}', nit='${nit}', email='${email}' 
        WHERE id_person=${id}`);
    
    return rowCount;
}

export const softDeleteClient=async(id)=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(`UPDATE membership SET is_active=false
            WHERE id_client=$1 AND is_active=true`, [id]);
        
        const { rowCount } = await pool.query(
            `UPDATE client SET is_deleted=$1 
          WHERE id_client=$2` , [true, id]);
        
        await client.query('COMMIT')
        return rowCount;
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Transaction error, reversion done', error);
    } finally{
        client.release();
    }
    
}

export const findClientByEmail=async(email)=>{
    const rows= await pool.query('SELECT * from person p INNER JOIN client c on c.id_client=p.id_person WHERE p.email=$1', [email]);

    return rows;
}