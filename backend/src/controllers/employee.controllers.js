import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const employeeList = await pool.query(
      `SELECT p.* FROM person p INNER JOIN employee e ON p.id_person=id_employee`
    );
    const employeeDate = employeeList.rows[0];

    return res.status(200).json(employeeDate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching clients" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query(
      `SELECT p.* FROM person p INNER JOIN employee e ON p.id_person=e.id_employee 
            WHERE id_employee=$1`,
      [id]
    );
    if (employee.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(employee.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const data = req.body;
    const employeeData = await pool.query(
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
    const employeeId = employeeData.rows[0].id_person;
    await pool.query("INSERT INTO employee (id_employee) VALUES ($1)", [
      employeeId,
    ]);

    return res.status(204).json("Data was inserted succesfully");
  } catch (error) {
    console.error(error);
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already Exist" });
    }

    return res.status(505).json({ message: "Internal error", error });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const { rowCount } =
      await pool.query(`UPDATE person SET name='${data.name}', lastname='${data.lastname}', phone='${data.phone}',
            photo='${data.photo}', ci='${data.ci}', nit='${data.nit}', email='${data.email}' WHERE id_person=${id}`);

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

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(`DELETE FROM employee WHERE id_employee=$1`,[id]);

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
