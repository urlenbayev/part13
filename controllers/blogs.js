import express from "express";
const router = express.Router();
import { Op } from "sequelize";
import { User, Blog } from "../models/index.js";
import { blogFinder, tokenExtractor } from "../middleware/middleware.js";

/**
|--------------------------------------------------
GET http://localhost:3001/api/blogs
Get all of the blogs
Example data
[
	{
		"id": 15,
		"author": "anonymous",
		"url": "somerandomlink",
		"title": "Rise flags",
		"likes": 0,
		"user_id": 14,
		"userId": 14,
		"user": {
			"id": 14,
			"name": "hillary",
			"username": "potus1990@gmail.com",
			"created_at": "2025-08-12 01:33:28.749 +00:00",
			"updated_at": "2025-08-12 01:35:21.345 +00:00"
		},
  ...
]
|--------------------------------------------------
*/
router.get("/", tokenExtractor, async (req, res) => {
  const { search } = req.query;
  if (!search) {
    const blogs = await Blog.findAll({
      include: {
        model: User,
        attributes: { exclude: ["password_hash"] },
      },
      order: [["likes", "DESC"]],
    });
    if (blogs.length === 0) {
      return res.status(404).json({ error: "Blogs do not exist" });
    }
    return res.status(200).json(blogs);
  } else {
    //Filter by a search word
    const blogs = await Blog.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { author: { [Op.iLike]: `%${search}%` } },
        ],
      },
      order: [["likes", "DESC"]],
    });
    if (blogs.length === 0) {
      return res.status(404).json({ error: "Blogs do not exist" });
    }
    res.status(200).json(blogs);
  }
});

/**
|--------------------------------------------------
POST http://localhost:3001/api/blogs
Add a new blog
|--------------------------------------------------
*/
router.post("/", tokenExtractor, async (req, res) => {
  const blog = { ...req.body, user_id: req.decodedToken.id };
  const result = await Blog.create(blog);
  return res.status(201).json(result);
});

/**
|--------------------------------------------------
DELETE http://localhost:3001/api/blogs/:id 
Remove a certain blog
|--------------------------------------------------
*/
router.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
  // only authorized one can delete a certain blog
  if (req.blog.user_id !== req.decodedToken.id) {
    return res.status(403).json({ error: "forbidden" });
  }
  await req.blog.destroy();
  return res.status(200).json("Successfull deletion");
});

/**
|--------------------------------------------------
PUT http://localhost:3001/api/blogs/:id 
Update a certain blog's likes count
|--------------------------------------------------
*/
router.put("/:id", tokenExtractor, blogFinder, async (req, res) => {
  const { likes } = req.body;

  if (!likes) {
    return res.status(400).json({ error: "Likes count is required" });
  }

  req.blog.likes = likes;

  await req.blog.save();
  return res.status(200).json({ likes: req.blog.likes });
});

export default router;
