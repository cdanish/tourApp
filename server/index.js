import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./config/db.js";
import morgan from "morgan";
import bodyParser from 'body-parser';
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import TourRouters from "./routes/tourRouter.js";


//dot env
dotenv.config();

const port = process.env.PORT || 5000;

//db js
ConnectDB();

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



//router
// app.get("/",(req,res)=>{
//     res.send("Helllo world");
// });
//user router
app.use("/api/v1/tour",userRouter);

//tour router
app.use("/api/v1/ctour",TourRouters);


//listen on port
app.listen(port,()=>{
    console.log(`server running on port ${port}`);

});