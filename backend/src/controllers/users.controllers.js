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

export const createUser = async (req, res)=>{
    
    try {
        const data=req.body;
        console.log(data)
        const {rows}= await pool.query(`INSERT INTO person (name, lastname, phone, photo, ci, nit, email, person_type) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [data.name, data.lastname, data.phone, data.photo , data.ci, data.nit, data.email, data.person_type]);
        return res.json(rows[0]);
    } catch (error) {
        console.log(error);
        if(error?.code==='23505'){
            return res.status(409).json({message:"Email already Exist"});
        }

        return res.status(505).json({message: 'Interanl error', error});
    }
    
}

export const updateUser=async(req,res)=>{
    const {id}=req.params;
    const data= req.body;
    const {rowCount}=await pool.query(`UPDATE person SET name='${data.name}', lastname='${data.lastname}', phone='${data.phone}', photo= '${data.photo}', 
        ci='${data.ci}', nit='${data.nit}', email='${data.email}', person_type='${data.person_type}' WHERE id_person=${id}`);
    
        if(rowCount===0){
            return res.status(404).json({message: 'User not found'})
        }
    res.json('Datos Actualizados');
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



