import express from "express";
import "dotenv/config";
import authRoute from "./routes/authRoutes.js";
import bookRoute from "./routes/bookRoutes.js"
import { connectDb } from "./lib/db.js";

const app = express();

/* ✅ MUST be before routes */
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDb();
  console.log(`Server running on ${PORT}`);
});
