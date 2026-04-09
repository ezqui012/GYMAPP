import { pool } from "../../config/db.js";

export const getAllEmployees=async()=>{
    const employees= await pool.query(`SELECT p.name, p.lastname, p.email, p.ci, e.schedule, e.job_role FROM person p INNER JOIN employee e ON p.id_person=e.id_employee`);

    return employees.rows;
}

export const getAnEmployee=async(id)=>{
    const employee= await pool.query('SELECT p.* FROM person p INNER JOIN employee e ON p.id_person=e.id_employee WHERE e.id_employee=$1', [id]);

    return employee.rows[0];
}

export const getEmailEmployeeWhitoutUser=async()=>{
    const emailEmployeeWhitoutUser=await pool.query(
        `SELECT e.id_employee, p.email 
        from person p inner join employee e on p.id_person=e.id_employee 
        left join users u on u.id_user=e.id_employee WHERE u.id_user is null`);

    return emailEmployeeWhitoutUser.rows;
}





export const createEmployee=async({name, lastname, phone,photo, ci, email, schedule, job_role})=>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const employeeData = await client.query(`INSERT INTO person (name, lastname, phone, photo, ci, nit, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_person`,
          [
            name,
            lastname,
            phone,
            photo,
            ci,
            "0000",
            email,
          ]
        );
        const employeeId = employeeData.rows[0].id_person;
    
        const employeeInserted=await client.query(`INSERT INTO employee (id_employee, job_role, schedule) VALUES ($1,$2,$3) RETURNING *`, [
            employeeId,
            job_role,
            schedule
        ]);

        const dataEmployee= employeeInserted.rows[0];
        await client.query('COMMIT');
        console.log('Sucessfull Transaction');
        return  dataEmployee;
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Transaction error, reversion done', error);
    } finally{
        client.release();
    }
    
}

export const updateEmployee=async({id, name, lastname, phone, photo, ci, nit, email})=>{
        const { rowCount } = await pool.query(`UPDATE person SET name='${name}', lastname='${lastname}',
        phone='${phone}', photo='${photo}', ci='${ci}', nit='${nit}', email='${email}' 
        WHERE id_person=${id}`);
           
    return rowCount;  
}


export const deleteEmployee=async(id)=>{
    const { rowCount } = await pool.query("DELETE FROM employee e WHERE e.id_employee=$1", [id]);
    return rowCount;
}


export const findEmployeeByEmail=async(email)=>{
    const rows= await pool.query('SELECT * from person p INNER JOIN employee e on e.id_employee=p.id_person WHERE p.email=$1', [email]);
    return rows;
}

export const findEmployeeById=async(id)=>{
    const employee= await pool.query('SELECT e.id_employee from employee e WHERE e.id_employee=$1', [id])
    return employee.rows[0];
}