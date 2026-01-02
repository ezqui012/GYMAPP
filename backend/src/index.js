import express from "express";
import morgan from "morgan";
import usersRoutes from './routes/users.routes.js';
import membershipTypeRoutes from './routes/membership_type.routes.js';
import clientRoutes from './routes/client.routes.js'
import employeeRoutes from './routes/employee.routes.js';
import { PORT } from "./config.js";

const app=express();

app.use(express.json());
app.use(morgan('dev'));
app.use(usersRoutes);
app.use(membershipTypeRoutes);
app.use(clientRoutes)
app.use(employeeRoutes);
app.listen(PORT);
console.log(`Server Running on port: http://localhost:${PORT}`);
