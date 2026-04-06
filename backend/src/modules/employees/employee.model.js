import { pool } from "../../config/db.js";

export const getAllEmployees=async()=>{
    const employees= await pool.query(`SELECT p.* FROM person p INNER JOIN employee e ON p.id_person=e.id_employee`);

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





export const createEmployee=async({name, lastname, phone,photo, ci, nit, email})=>{
    const employeeData = await pool.query(`INSERT INTO person (name, lastname, phone, photo, ci, nit, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_person`,
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
    const employeeId = employeeData.rows[0].id_person;
    await pool.query(`INSERT INTO employee (id_employee) VALUES ($1)`, [employeeId]);
    return employeeData.rows[0];
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