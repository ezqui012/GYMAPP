import express from "express";
import morgan from "morgan";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { PORT } from "./config/config.js";

import usersRoutes from './routes/users.routes.js';
import membershipTypeRoutes from './modules/membership_type/membership_type.routes.js';
import membershipRoutes from './modules/memberships/membership.routes.js';
import clientRoutes from './modules/clients/client.routes.js';
import employeeRoutes from './modules/employees/employee.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/users.routes.js'

const app=express();
const ACCEPTED_ORIGINS=[
    "http://localhost:3000",
]

app.use(
    cors({
        origin:(origin, callback)=>{
            if(ACCEPTED_ORIGINS.includes(origin)){
                return callback(null, true);
            }
            return callback(null, true);
        },
        credentials: true
    }
        
));


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(usersRoutes);
app.use(membershipTypeRoutes);
app.use(membershipRoutes);
app.use(clientRoutes)
app.use(employeeRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.listen(PORT);
console.log(`Server Running on port: http://localhost:${PORT}`);
