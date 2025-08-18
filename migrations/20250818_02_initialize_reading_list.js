import { DataTypes } from "sequelize";

export const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("readings", {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      validate: {
        notEmpty: true,
      },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
      validate: {
        notEmpty: true,
      },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};
export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("readings");
};
