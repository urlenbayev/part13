import { DataTypes } from "sequelize";
import db from "../utils/db.js";
import User from "./User.js";
import Blog from "./Blog.js";

const Reading = db.define(
  "reading",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      validate: {
        notEmpty: true,
      },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Blog, key: "id" },
      validate: {
        notEmpty: true,
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    underscored: true,
  }
);

export default Reading;
