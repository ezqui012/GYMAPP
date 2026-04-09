import * as employeeModel from './employee.model.js';

export const getEmployees=async()=>{
    return await employeeModel.getAllEmployees();
}

export const getEmployee=async(id)=>{
    const employee= await employeeModel.getAnEmployee(id);
    if(!employee) throw new Error("Employee does not exist");
    
    return employee;
}

export const employeEmailWhitoutUser=async()=>{
    const users= await employeeModel.getEmailEmployeeWhitoutUser();
    if(!users)throw new Error("Error fetching data");
    
    return users;
}
export const createEmployee=async({name, lastname , phone, photo , ci, email, schedule, job_role})=>{
    const verifyEmployee= await employeeModel.findEmployeeByEmail(email);
    if(!verifyEmployee){
        const error = new Error("Email is already in use");
        error.status=400;
        throw error;
    }

    const employeeData= await employeeModel.createEmployee({name, lastname, phone, photo, ci, email, schedule, job_role});
    if(!employeeData){
        const error = new Error('Error creating employee');
        error.status=500;
        throw error;
    }

    return employeeData;
}

export const updateEmployee=async({id, name, lastname , phone, photo , ci, nit, email })=>{
    
    const employeeUpdated= await employeeModel.updateEmployee({id,name,lastname,phone,photo,ci,nit,email});
    if(!employeeUpdated) throw new Error("Error updating data");

    return employeeUpdated;
}

export const deleteEmployee=async(id)=>{
    return await employeeModel.deleteEmployee(id);
}