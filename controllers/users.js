import express from "express";
import { User, Blog } from "../models/index.js";
import { userFinder, tokenExtractor } from "../middleware/middleware.js";
import bcrypt from "bcrypt";
const router = express.Router();

/**
|--------------------------------------------------
GET http://localhost:3001/api/users
Get all users
Example data
[
	{
		"id": 14,
		"name": "hillary",
		"username": "potus1990@gmail.com",
		"password_hash": "some hash",
		"created_at": "2025-08-12 01:33:28.749 +00:00",
		"updated_at": "2025-08-12 01:35:21.345 +00:00",
    "blogs": 
    [
      {
				"id": 17,
				"author": "anonymous",
				"url": "somerandomlink",
				"title": "Rise flags",
				"likes": 0,
				"user_id": 14,
				"userId": 14
			},
      ...
    ]
	},
  ...
]
|--------------------------------------------------
*/
router.get("/", tokenExtractor, async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
    },
  });

  if (users.length === 0) {
    return res.status(404).json({ error: "Users do not exist" });
  }
  return res.status(200).json(users);
});

/**
|--------------------------------------------------
POST http://localhost:3001/api/users
create a new user
|--------------------------------------------------
*/
router.post("/", async (req, res) => {
  const { name, username, password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Password is required!" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = {
    name: name,
    username: username,
    password_hash: passwordHash,
  };
  await User.create(newUser);
  return res.status(201).json(newUser);
});

/**
|--------------------------------------------------
PUT http://localhost:3001/api/users/:username
update user's username
|--------------------------------------------------
*/
router.put("/:username", tokenExtractor, userFinder, async (req, res) => {
  const { username } = req.body;
  //only authorized owner can update username
  if (req.user.id !== req.decodedToken.id) {
    return res.status(403).json({ error: "forbidden" });
  }

  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }

  req.user.username = username;
  await req.user.save();
  return res.status(200).json({ username: req.user.username });
});

export default router;
