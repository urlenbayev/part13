import express from "express";
const router = express.Router();
import Blog from "../models/Blog.js";
import { blogFinder } from "../middleware/middleware.js";
/**
|--------------------------------------------------
GET http://localhost:3001/blogs
Get all of the blogs
Example data
[
  {
		"id": 1,
		"author": "OBAMA",
		"url": "somelink",
		"title": "american food",
		"likes": 4
	},
  ...
]
|--------------------------------------------------
*/
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll({});
    if (blogs.length === 0) {
      return res.status(404).json({ error: "resource not found" });
    }
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

/**
|--------------------------------------------------
POST http://localhost:3001/blogs
Add a new blog
|--------------------------------------------------
*/
router.post("/", async (req, res) => {
  const { id, author, url, title, likes } = req.body;

  if (!id || !author || !url || !title) {
    return res.status(400).json({ error: "Missing required fields!" });
  }
  const blog = { id, author, url, title, likes };
  try {
    await Blog.create(blog);
    res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

/**
|--------------------------------------------------
DELETE http://localhost:3001/blogs/:id 
Remove a certain blog
|--------------------------------------------------
*/
router.delete("/:id", blogFinder, async (req, res) => {
  try {
    await req.blog.destroy();
    res.status(200).send("Successfull deletion");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

/**
|--------------------------------------------------
PUT http://localhost:3001/blogs/:id 
Update a certain blog's likes count
|--------------------------------------------------
*/
router.put("/:id", blogFinder, async (req, res) => {
  const { likes } = req.body;

  if (!likes) {
    return res.status(400).json({ error: "Likes count is required" });
  }

  req.blog.likes = likes;

  try {
    await req.blog.save();
    res.status(200).json({ likes: req.blog.likes });
  } catch (err) {
    console.error("Error updating resource:", err);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
