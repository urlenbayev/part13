import Blog from "./Blog.js";
import User from "./User.js";
import Reading from "./Reading.js";

User.hasMany(Blog, { foreignKey: "user_id" });
Blog.belongsTo(User, { foreignKey: "user_id" });

User.belongsToMany(Blog, {
  through: Reading,
  as: "readings",
  foreignKey: "user_id",
});
Blog.belongsToMany(User, {
  through: Reading,
  as: "users_marked",
  foreignKey: "blog_id",
});

export { Blog, User, Reading };
