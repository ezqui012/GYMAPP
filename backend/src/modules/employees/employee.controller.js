import * as employeeService from './employee.service.js';

export const getEmployees=async(req, res)=>{
    try {
        const employees= await employeeService.getEmployees();

        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getEmployee=async(req, res)=>{
    try {
        const {id}=req.params;
        const rows = await employeeService.getEmployee(id);
        res.json(rows)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getEmployeeEmailsWhioutUser=async(req, res)=>{
    try {
        const users = await employeeService.employeEmailWhitoutUser();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createEmployee=async(req,res)=>{
    try {
        const {name, lastname, phone, photo, ci, nit, email}=req.body;
        await employeeService.createEmployee({name, lastname, phone, photo, ci, nit, email});
        res.status(201).json("Data was inserted succesfully");
    } catch (error) {
        const status=error.message==='Email is already used' ? 400:500;
        res.status(status).json({message: error.message})
    }
}

export const updateEmployee=async(req,res)=>{
    try {
        const {id}=req.params;
       // console.log(id)
        const {name, lastname, phone, photo, ci, nit, email} = req.body;
       // console.log(name)
        const updatedData =await employeeService.updateEmployee({id, name, lastname, phone, photo, ci, nit, email});
        
        if (updatedData === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json("Updated Data");
    } catch (error) {
        // console.log(error)
         res.status(500).json({message: "Internal servers error"});
    }
}


export const deleteEmployee=async(req,res)=>{
    try {
        const {id} = req.params;
        const deleted= await employeeService.deleteEmployee(id)
        if(deleted===0) return res.status(404).json({ message: "User not found" });
        
        res.status(202).json("Request was done sucessfully")
    } catch (error) {
        return res.status(500).json({message: "Internal server error"});
    }
}