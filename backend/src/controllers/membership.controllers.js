import { pool } from "../db.js";

export const getMemberships = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM membership`);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching memberships" });
  }
};
export const getAMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT * FROM membership WHERE id_membership=$1`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Client not found" });
    }
    return res.status(200).json(rows[0]);
  } catch (error) {
    onsole.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createMembership = async (req, res) => {
  try {
    const data = req.body;
    const membershipData = await pool.query(
      `INSERT INTO membership (init_date, end_date, is_active, id_membership_type, id_client) 
            VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [
        data.init_date,
        data.end_date,
        data.is_active,
        data.id_membership_type,
        data.id_client,
      ]
    );

    return res
      .status(200)
      .json({ message: "Membership registered successfully" });
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already Exist" });
    }

    return res.status(505).json({ message: "Internal error", error });
  }
};

export const updateMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const membershipData = req.body;
    const { rowCount } = await pool.query(`UPDATE membership SET 
                    init_date=$1, end_date=$2, is_active=$3, id_membership_type=$4 WHERE id_membership=$5`,
                    [
                      membershipData.init_date,
                      membershipData.end_date,
                      membershipData.is_active,
                      id
                    ]);
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


