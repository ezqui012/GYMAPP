import { pool } from "../../config/db.js";


// get clients by membership state: active, expired, no membership, 
export const getClientsByMembershipState=async()=>{
    const clients = await pool.query(`SELECT 
                                    c.id_client, p.name, p.lastname, p.ci, p.email,MIN(m.init_date) as join_date, TO_CHAR(MAX(m.end_date), 'YYYY-MM-DD') as last_end_date,
                                    (SELECT mt2.name 
                                    FROM membership m2 
                                    INNER JOIN membership_type mt2 ON m2.id_membership_type = mt2.id_membership_type
                                    WHERE m2.id_client = c.id_client 
                                    ORDER BY m2.init_date DESC 
                                    LIMIT 1) as membership_type_name,
                                    CASE
                                        WHEN MAX(m.id_membership) IS NULL THEN 'sin membresia'
                                        WHEN MAX(CASE WHEN m.state = 'activo' THEN 1 END) = 1 
                                        AND MAX(m.end_date) - CURRENT_DATE <= 5 THEN 'por expirar'
                                        WHEN MAX(CASE WHEN m.state = 'activo' THEN 1 END) = 1 THEN 'activo'
                                        WHEN MAX(CASE WHEN m.state = 'pendiente' THEN 1 END) = 1 THEN 'pendiente'
                                        ELSE (SELECT state FROM membership 
                                            WHERE id_client = c.id_client 
                                            ORDER BY init_date DESC 
                                            LIMIT 1)
                                    END as state
                                    FROM person p 
                                    LEFT JOIN client c ON p.id_person = c.id_client 
                                    LEFT JOIN membership m ON c.id_client = m.id_client
                                    WHERE c.id_client = p.id_person 
                                    AND c.is_deleted = false
                                    GROUP BY c.id_client, p.name, p.lastname, p.ci, p.email
                                    ORDER BY p.name ASC`);

        console.log(clients.rows)

        return clients.rows;
}
//get a client by membership state
export const getAClientByMembershipState=async(id)=>{

    try {
        const client = await pool.query(`SELECT c.id_client, p.name, p.lastname, p.ci, p.email,MIN(m.init_date) as join_date,mt.name as membership_type_name, TO_CHAR(m.end_date, 'YYYY-MM-DD') as end_date,
                                    CASE
                                        WHEN m.id_membership IS NULL THEN 'sin_membresia'
                                        ELSE m.state
                                    END as state
                                    FROM person p 
                                    LEFT JOIN client c ON p.id_person = c.id_client 
                                    LEFT JOIN membership m ON c.id_client = m.id_client
                                    AND m.id_membership = (
                                        SELECT id_membership FROM membership
                                        WHERE id_client = c.id_client
                                        ORDER BY init_date DESC
                                        LIMIT 1
                                    )
                                    LEFT JOIN membership_type mt ON m.id_membership_type = mt.id_membership_type
                                    WHERE c.id_client = p.id_person 
                                    AND c.is_deleted = false
                                    AND c.id_client = $1
                                    GROUP BY c.id_client, p.name, p.lastname, p.ci, p.email, mt.name, m.end_date, m.id_membership, m.state`, [id]);
        return client.rows[0];
    } catch (error) {
        console.log(error)
    }
    
}
//get all clients active, inactive,
export const getClients=async()=>{
    const clients = await pool.query("SELECT p.* FROM person p INNER JOIN client c ON c.id_client=p.id_person");
    return clients.rows;
}
//get active clients with an active membership
export const activeClients=async()=>{
    const clients = await pool.query(`SELECT c.id_client, p.name, p.lastname, p.ci, p.email, m.end_date from (person p inner join client c on p.id_person =c.id_client) 
                                    inner join membership m on m.id_client=c.id_client where m.state ='activo'`);
    return clients.rows;
}

//get inactive clients 
export const inactiveClients=async()=>{
    const clients = await pool.query(`SELECT DISTINCT c.id_client, p.name, p.lastname, p.ci, p.email from (person p inner join client c on p.id_person =c.id_client) 
                                    inner join membership m on m.id_client=c.id_client where m.state ='expirado' AND c.id_client NOT IN (
                                    SELECT id_client FROM membership WHERE is_active = 'activo')`);
    return clients.rows;
}

export const softDeletedClients=async()=>{
    const clients = await pool.query(`SELECT c.id_client, p.name, p.lastname, p.ci, p.nit, p.photo, p.email from person p inner join client c on p.id_person =c.id_client 
                                     where c.is_deleted='activo'`);

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
        await client.query(`UPDATE membership SET is_active='expirado'
            WHERE id_client=$1 AND is_active='activo'`, [id]);
        
        const { rowCount } = await pool.query(
            `UPDATE client SET is_deleted=$1 
          WHERE id_client=$2` , ['activo', id]);
        
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