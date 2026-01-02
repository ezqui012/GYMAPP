import { pool } from "../db.js";

export const getClients = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT p.* FROM person p INNER JOIN client c ON c.id_client=p.id_person"
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching clients" });
  }
};

export const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT p.* FROM person p INNER JOIN client c ON c.id_client=p.id_person 
        WHERE c.id_client=$1`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const createClient = async (req, res) => {
  try {
    const data = req.body;
    const clientData = await pool.query(
      `INSERT INTO person (name, lastname, phone, photo, ci, nit, email) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_person`,
      [
        data.name,
        data.lastname,
        data.phone,
        data.photo,
        data.ci,
        data.nit,
        data.email,
      ]
    );
    const clientId = clientData.rows[0].id_person;
    await pool.query(`INSERT INTO client (id_client) VALUES ($1)`, [clientId]);

    return res.status(201).json("Client registered sucessfully");
  } catch (error) {
    console.error(error);
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already Exist" });
    }

    return res.status(505).json({ message: "Internal error", error });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const clientData = req.body;
    const { rowCount } =
      await pool.query(`UPDATE person SET name='${clientData.name}', lastname='${clientData.lastname}',
    phone='${clientData.phone}', photo='${clientData.photo}', ci='${clientData.ci}', nit='${clientData.nit}', email='${clientData.email}' 
    WHERE id_person=${id}`);
    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json("Updated Data");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      "DELETE FROM client c WHERE c.id_client=$1", [id]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
