import Blog from "../models/Blog.js";

export const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

export const errorHandler = async (error, req, res, next) => {
  if (error.name === "SequelizeDatabaseError") {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: "Server error" });
};
