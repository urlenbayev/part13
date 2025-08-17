import { DataTypes } from "sequelize";
const currentYear = new Date().getFullYear();

export const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("blogs", "year", {
    type: DataTypes.INTEGER,
    validate: {
      min: 1991,
      max: currentYear,
    },
  });
};
export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("blogs", "year");
};
