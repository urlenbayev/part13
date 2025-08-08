import Blog from "../models/Blog.js";

const rows = await Blog.findAll({});

rows.forEach((blog) =>
  console.log(
    `${blog.dataValues.author}: '${blog.dataValues.title}', ${blog.dataValues.likes} likes`
  )
);
