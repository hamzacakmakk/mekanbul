import userRoutes from "./routes/userRoutes.js";
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from "./config/db.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("API çalışıyor");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server çalışıyor:", PORT);
});
