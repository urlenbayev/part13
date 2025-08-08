import { DataTypes } from "sequelize";
import db from "../db.js";

const Blog = db.define(
  "blog",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: "0",
    },
  },
  {
    underscored: true,
    timestamps: false,
  }
);

export default Blog;
