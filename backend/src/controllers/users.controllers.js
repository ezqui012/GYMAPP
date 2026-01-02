import { pool } from "../db.js";

export const getUsers = async(req, res)=>{
  const { rows } = await pool.query(`SELECT * from person`);
  res.json(rows);
};

export const getUser = async (req, res)=>{
    const {id} = req.params;
    const {rows} = await pool.query(`SELECT * from person where id_person=${id}`);
     if(rows.length===0){
        return res.status(404).json({message: 'User not found'});
    }
    res.json(rows);
}

// export const createUser = async (req, res)=>{
    
//     try {
//         //To create a person
//         const data=req.body;
//         const personResult= await pool.query(`INSERT INTO person (name, lastname, phone, photo, ci, nit, email) 
//             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [data.name, data.lastname, data.phone, data.photo , data.ci, data.nit, data.email]);
//         const person=personResult.rows[0];
//             console.log(person.person_type)
//         if(person.person_type==='client'){
//             //To insert client id_person into client table    
//             await pool.query(`INSERT INTO client (id_client) VALUES($1)`, [person.id_person]);
//         }
//         if(person.person_type==='employee'){
//             //To insert client id_person into employee table    
//              await pool.query(`INSERT INTO employee (id_employee) VALUES($1)`, [person.id_person]); 
//         }

//         return res.status(201).json({
//                 person,
//                 role: person.person_type
//             });
//     } catch (error) {
//         console.log(error);
//         if(error?.code==='23505'){
//             return res.status(409).json({message:"Email already Exist"});
//         }

//         return res.status(505).json({message: 'Internal error', error});
//     }
    
// }

export const updateUser=async(req,res)=>{
    const {id}=req.params;
    const data= req.body;
    const {rowCount}=await pool.query(`UPDATE person SET name='${data.name}', lastname='${data.lastname}', phone='${data.phone}', photo= '${data.photo}', 
        ci='${data.ci}', nit='${data.nit}', email='${data.email}' WHERE id_person=${id}`);
    
        if(rowCount===0){
            return res.status(404).json({message: 'User not found'})
        }
    res.json('Updated Data');
}


export const deleteUser=async (req,res)=>{
    const {id} = req.params;
    const {rowCount} = await pool.query('DELETE FROM person WHERE id_person=$1', [id]);

    if (rowCount===0) {
        return res.status(404).json({message: 'User not found'});
    }
    console.log(rowCount);
    return res.sendStatus(204);
}



