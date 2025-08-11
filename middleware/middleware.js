import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

export const userFinder = async (req, res, next) => {
  req.user = await User.findOne({
    where: { username: req.params.username },
  });
  next();
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = async (error, req, res, next) => {
  if (error.name === "SequelizeDatabaseError") {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: "Server error" });
};
