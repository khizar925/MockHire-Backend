import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const router = express.Router();

// Use POST for creating new feedback
router.post("/", async (req, res) => {
    try {
        const { name, email, message, rating } = req.body;

        if (!name || !email || !message || !rating) {
            return res.status(400).json({ error: "Missing body parameter" });
        }

        const { error } = await supabase
            .from("feedback")
            .insert({ name, email, message, rating });

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({ success: true, message: "Feedback submitted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
