import express from "express";
import User from "../models/User.js";
import { userFinder } from "../middleware/middleware.js";
import bcrypt from "bcrypt";
const router = express.Router();

/**
|--------------------------------------------------
GET http://localhost:3001/users
Get all users
Example data
[
	{
		"id": 1,
		"name": "Joe Biden",
		"username": "potus2020",
		"password_hash": "some generated hash",
		"created_at": "2025-08-11 11:09:53.435 +00:00",
		"updated_at": "2025-08-11 11:09:53.435 +00:00"
	},
  ...
]
|--------------------------------------------------
*/
router.get("/", async (req, res) => {
  const users = await User.findAll({});

  if (users.length === 0) {
    return res.status(404).json({ error: "Users table is empty" });
  }
  return res.status(200).json(users);
});

/**
|--------------------------------------------------
POST http://localhost:3001/users
create a new user
|--------------------------------------------------
*/
router.post("/", async (req, res) => {
  const { id, name, username, password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "Password is required!" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = {
    id: id,
    name: name,
    username: username,
    password_hash: passwordHash,
  };
  await User.create(newUser);
  return res.status(201).json(newUser);
});

/**
|--------------------------------------------------
PUT http://localhost:3001/users/:username
update user's username
|--------------------------------------------------
*/
router.put("/:username", userFinder, async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "username is required" });
  }
  req.user.username = username;
  await req.user.save();
  return res.status(200).json({ username: req.user.username });
});

export default router;
