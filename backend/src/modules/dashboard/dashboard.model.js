import { pool } from "../../config/db.js";

export const getDashboardStats=async()=>{
    const dashboardStats = await  pool.query(`select 
                                            -- Total active clients
                                            (SELECT count(*) as active_clients 
                                                    from (person p inner join client c on p.id_person =c.id_client) 
                                                    inner join membership m on m.id_client=c.id_client where m.state ='activo'),
                                            -- Total inactive clients
                                                    (SELECT distinct count(*) as inactive_clients
                                                    from (person p inner join client c on p.id_person =c.id_client) 
                                                    inner join membership m on m.id_client=c.id_client where m.state ='expirado' AND c.id_client NOT IN (
                                                    SELECT id_client FROM membership WHERE c.is_deleted=true)),
                                            -- Total employees
                                                    
                                                    (SELECT count(*) as total_employee 
                                                    from employee e),
                                            -- Total memberships that expires today
                                                    (SELECT count (m.id_membership ) as today_expires
                                                    from membership m 
                                                    where m.end_date = current_date)`);
    return dashboardStats.rows;
}

export const getExpiredMemberships=async()=>{
        const expiredMemberships = await pool.query(`select distinct c.id_client, m.id_membership , p."name", mt."name" as plan_name, (current_date - m.end_date) as elapsed_time 
                                                        from person p inner join client c on p.id_person =c.id_client inner join membership m on m.id_client = c.id_client 
                                                        inner join membership_type mt on mt.id_membership_type = m.id_membership_type 
                                                        where current_date > m.end_date and m.state = 'expirado'
                                                        order by elapsed_time asc
                                                        limit 2`);
        return expiredMemberships.rows;
}

export const getExpiringMemberships=async()=>{
        const expiringMemberships=await pool.query(`select distinct c.id_client ,  p."name" , mt."name" as plan_name, to_char(m.end_date, 
                                                        'TMDay, DD "de" TMMonth "de" YYYY') as end_date, (m.end_date - current_date) as days_remaining
                                                        from person p inner join client c on p.id_person =c.id_client inner join membership m on c.id_client =m.id_client 
                                                        inner join membership_type mt on m.id_membership_type =mt.id_membership_type 
                                                        where m.state ='activo' and (m.end_date  - current_date)>0 and (m.end_date  - current_date)<=5 
                                                        order by days_remaining asc 
                                                        limit 3`);
        return expiringMemberships.rows;
}