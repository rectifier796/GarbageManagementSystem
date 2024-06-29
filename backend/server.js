import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import ExpressFormidable from "express-formidable";
import cors from 'cors';
import cookieParser from "cookie-parser";
import queryRoutes from "./routes/queryRoutes.js";

const app = express();
dotenv.config();

//Database Connection
connectDB();

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Welcome To Garbage Management System" });
});

//Middleware
app.use(ExpressFormidable({multiples:true}));

app.use(cors({
    origin:'*',
}))

app.use(cookieParser({httpOnly:true, secure:true, sameSite:'strict', maxAge:1000*60*60*24*10,signed:true}));


//Routes
app.use("/api/auth",authRoutes);

app.use("/api/query",queryRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
