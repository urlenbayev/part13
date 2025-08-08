import config from "./config.js";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(config.dbUrl, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Connect to the database at startup
const main = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();

export default sequelize;
