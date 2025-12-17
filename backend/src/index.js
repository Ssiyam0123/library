import express from "express"
import "dotenv/config"
import authRoute from "./routes/authRoutes.js";
import { connectDb } from "./lib/db.js";
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express();

<<<<<<< Updated upstream
const PORT = process.env.PORT;
=======
app.use(express.json());
app.use(cors());
>>>>>>> Stashed changes

app.use("/api/auth",authRoute);

app.listen(PORT,()=>{
    connectDb();
    console.log(`server is running ${PORT}`);
})