import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET /routes/interviews - fetch all interviews
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM interviews");
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching interviews:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
