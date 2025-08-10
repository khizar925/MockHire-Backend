import express from "express";
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const router = express.Router();

// GET /routes/interviews - fetch all interviews
router.get("/", async (req, res) => {
  const { data, error } = await  supabase.from('interviews').select('*').order("id", {ascending: true});
  if (error) return res.json(400).json({error : error.message})
  res.status(200).json({data: data})

});

export default router;
