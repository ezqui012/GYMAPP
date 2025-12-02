import { Router } from "express";
import { pool } from "../db.js";
const router=Router();


router.get('/users',async (req,res)=>{
    const {rows} = await pool.query(`SELECT * from person`);
   res.json(rows);

})

export default router;