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

/**
|--------------------------------------------------
PUT http://localhost:3001/api/readinglists/:id
Toggle a certain blog's read field
|--------------------------------------------------
*/
router.put("/:id", tokenExtractor, async (req, res) => {
  const { id } = req.params,
    { read } = req.body,
    { user_id } = await Reading.findOne({ where: { blog_id: id } });
  //only authorized owner can update read mark
  if (user_id !== req.decodedToken.id) {
    return res.status(403).json({ error: "forbidden" });
  }
  await Reading.update({ read }, { where: { blog_id: id } });
  res.status(200).json("Updated successfully");
});
export default router;
