import "dotenv/config";

const port = process.env.PORT;
const dbUrl = process.env.DB_CONNECTION_URL;

export default { port, dbUrl };
