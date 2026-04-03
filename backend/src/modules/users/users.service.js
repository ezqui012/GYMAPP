import * as userModel from '../users/users.model.js'
import * as employeeModel from '../employees/employee.model.js';
import * as personModel from '../person/person.model.js';
import { SALT_ROUNDS } from "../../config/config.js";
import bcrypt from 'bcrypt';


export const getUsers=async()=>{
    const users= await userModel.getUsers();
    if(!users)throw new Error("Error fetching data");
    
    return users;
}

export const getUser=async(id)=>{
    const user=  await userModel.getUserBydId(id);

    if(!user)throw new Error("error fetching dat");
    

    return user;
}

export const createAUser=async({email, password,id_role})=>{
    const person = await personModel.getPersonByEmail(email);
    if(!person)throw new Error("Person does not exist, regist employee");

    const employee = await employeeModel.findEmployeeById(person.id_person);
    if(!employee)throw new Error("Employee does not exist");

    const userExist= await userModel.getUserBydId(employee.id_employee);
    if(userExist) throw new Error("User already exists");
    
    
    const hashedPassword= await bcrypt.hash(password, SALT_ROUNDS);

    const user=await userModel.createUser({
        id_user: employee.id_employee,
        password: hashedPassword, 
        id_role
    });
    if(!user)throw new Error("Error creating user");
    return user;
}