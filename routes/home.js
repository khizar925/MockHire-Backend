import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});


router.get("/test", async (req, res, next) => {
  return res.status(200).json({
    title: "Khizar Testing",
    message: "The app is working properly!",
  });
});


export default router;
