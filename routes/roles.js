import express from "express";
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const router = express.Router();

router.get("/", async (req, res) => {
    const { title } = req.query;
    if (!title) return res.status(400).json({ error: "Missing 'title' query parameter" });
    const { data, error } = await supabase.from("roles").select('*').eq("title", title);
    if (error) return res.status(400).json({error : error.message});
    res.status(200).json({data : data})
})

export default router;