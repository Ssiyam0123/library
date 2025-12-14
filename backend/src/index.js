import express from "express"
import "dotenv/config"
import authRoute from "./routes/authRoutes.js";
import { connectDb } from "./lib/db.js";

const app = express();

const PORT = process.env.PORT;

app.use("/api/auth",authRoute);

app.listen(PORT,()=>{
    connectDb();
    console.log(`server is running ${PORT}`);
})