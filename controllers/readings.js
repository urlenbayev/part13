import express from "express";
const router = express.Router();
import { tokenExtractor } from "../middleware/middleware.js";
import { Reading } from "../models/index.js";
/**
|--------------------------------------------------
POST http://localhost:3001/api/readinglists
Add a certain blog for reading later
|--------------------------------------------------
*/
router.post("/", tokenExtractor, async (req, res) => {
  const { userId, blogId } = req.body;
  const reading = {
    user_id: userId,
    blog_id: blogId,
  };
  const result = await Reading.create(reading);
  res.status(201).json(result);
});

export default router;
