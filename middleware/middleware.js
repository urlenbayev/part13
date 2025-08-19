import Blog from "../models/Blog.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

export const blogFinder = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(404).json({ error: "no id in params" });
  }
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).json({ error: "blog does not exist" });
  }
  next();
};

export const userFinder = async (req, res, next) => {
  if (req.params.username) {
    req.user = await User.findOne({
      where: { username: req.params.username },
    });
  }

  if (!req.user) {
    return res.status(404).json({ error: "user does not exist" });
  }
  next();
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = async (error, req, res, next) => {
  if (error.name.startsWith("Sequelize")) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: error.message });
};

export const tokenExtractor = async (req, res, next) => {
  const token = req.get("authorization");

  if (token && token.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(token.substring(7), config.SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

export const unknownEndpoint = (req, res) => {
  return res.status(404).send({ error: "unknown endpoint" });
};
