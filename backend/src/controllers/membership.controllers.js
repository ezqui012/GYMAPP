import { pool } from "../db.js";

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

    return res.status(200).json({ message: "Membership registered successfully" });
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already Exist" });
    }

    return res.status(505).json({ message: "Internal error", error });
  }
};
