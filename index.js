// Import packages
import express from "express";
import home from "./routes/home.js";
import dotenv from 'dotenv';

dotenv.config()

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/api", home);

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));