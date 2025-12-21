import express from "express";
import morgan from "morgan";
import usersRoutes from './routes/users.routes.js'
import { PORT } from "./config.js";

const app=express();

app.use(express.json());
app.use(morgan('dev'));
app.use(usersRoutes);

app.listen(PORT);
console.log(`Server Running on port: http://localhost:${PORT}`);
