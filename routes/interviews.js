import express from "express";

const router = express.Router();

// GET /routes/interviews - fetch all interviews
router.get("/", async (req, res) => {
  try {
    res.status(200).json({message : "succesfull"})
  } catch (error) {
    res.status(400).json({message : "Unsuccessful"})
  }
});

export default router;
