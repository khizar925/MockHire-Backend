// Import packages
import express from "express";
import interviews from "./routes/interviews.js";
import roles from "./routes/roles.js";
import transcript from "./routes/transcript.js";
import feedback from "./routes/feedback.js";
import contact from "./routes/contact.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  })
);

app.use(express.json());

// Routes
app.use("/api/interviews", interviews);
app.use("/api/roles", roles);
app.use("/api/transcript", transcript);
app.use("/api/feedback", feedback);
app.use("/api/contact", contact);

// connection
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));
