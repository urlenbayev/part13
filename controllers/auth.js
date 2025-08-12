import jwt from "jsonwebtoken";
import express from "express";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import config from "../utils/config.js";
const router = express.Router();

/**
|--------------------------------------------------
POST http://localhost:3001/api/auth/login
User authN, returns a token
|--------------------------------------------------
*/
router.post("/login", async (req, res) => {
  const { password, username } = req.body;
  if (!password || !username) {
    return res.status(400).json({ error: "username or password missing!" });
  }
  const user = await User.findOne({ where: { username: username } });
  const correctPassword = await bcrypt.compare(password, user.password_hash);
  if (!(user && correctPassword)) {
    return res.status(400).json({ error: "Incorrect username or password!" });
  }

  // Create a JWT
  const token = jwt.sign({ id: user.id, username }, config.SECRET, {
    expiresIn: "10h",
  });

  return res.status(200).json({ token });
});

export default router;
