import Blog from "./Blog.js";
import User from "./User.js";
import Reading from "./Reading.js";

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: Reading, as: "marked_blogs" });
Blog.belongsToMany(User, { through: Reading, as: "users_marked" });

export { Blog, User, Reading };
