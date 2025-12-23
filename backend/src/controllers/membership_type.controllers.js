import { pool } from "../db.js";

export const getMembershipTypes = async (req, res) => {
  const { rows } = await pool.query(`SELECT * from membership_type`);
  res.json(rows);
};

export const getAMembershipType = async (req, res)=>{
  const {id}=req.params;
  const {rows} = await pool.query(`SELECT * from membership_type WHERE id_membership_type=${id}`);
  res.json(rows[0]);
};

export const createMembershipType = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query(
      `INSERT INTO membership_type (name, description,duration,price) 
        VALUES ($1, $2, $3, $4)`,
      [data.name, data.description, data.duration, data.price]
    );
    return res.json("usuario registrado con éxito", rows[0]);
  } catch (error) {
    console.log(error);
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already Exist" });
    }

    return res.status(505).json({ message: "Interanl error", error });
  }
};

export const updateMembershipType = async (req, res) => {
  try {
    const {id}=req.params;
    const data=req.body;
    const {rowCount}=await pool.query(`UPDATE membership_type SET name='${data.name}', 
      description='${data.description}', duration='${data.duration}' , price='${data.price}' WHERE id_membership_type=${id}`);

    if(rowCount===0){
        return res.status(404).json({message: 'Data not found'});
    }
    res.json('Datos Actualizados');

  } catch (error) {
    console.log(error)
  }
};

export const deleteMembershipType = async(req, res)=>{
  const {id}= req.params;
  const {rowCount}= await pool.query(`DELETE FROM membership_type WHERE id_membership_type=${id}`);
  if (rowCount===0) {
    return res.status(404).json({message: 'User not found'});
  }
  console.log(rowCount);
  return res.sendStatus("usuario eliminado con éxito",204);
}
