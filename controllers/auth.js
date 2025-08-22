import jwt from "jsonwebtoken";
import express from "express";
import { Session, User } from "../models/index.js";
import bcrypt from "bcrypt";
import config from "../utils/config.js";
import { tokenExtractor } from "../middleware/middleware.js";
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
  if (user.banned) {
    return res.status(401).json({ error: "account suspended" });
  }
  // Create a JWT
  const token = jwt.sign({ id: user.id, username }, config.SECRET, {
    expiresIn: 60,
  });
  const { exp } = jwt.decode(token);
  const session = await Session.create({
    user_id: user.id,
    expires_at: new Date(Number(exp * 1000)),
  });
  return res.status(200).json({ token, session });
});

/**
|--------------------------------------------------
DELETE http://localhost:3001/api/auth/logout
Delete a certain session
|--------------------------------------------------
*/
router.delete("/logout", tokenExtractor, async (req, res) => {
  const user_id = req.decodedToken.id;
  // eslint-disable-next-line no-unused-vars
  const result = await Session.destroy({ where: { user_id: user_id } });
  res.status(200).json("Successfully removed token");
});
export default router;
