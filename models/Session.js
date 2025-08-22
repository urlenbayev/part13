import { DataTypes } from "sequelize";
import db from "../utils/db.js";
import User from "./User.js";

const Session = db.define(
  "session",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      validate: {
        notEmpty: true,
      },
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    updatedAt: "updated_at",
    createdAt: "created_at",
  }
);
export default Session;
