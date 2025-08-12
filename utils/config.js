import "dotenv/config";

const port = process.env.PORT;
const dbUrl = process.env.DB_CONNECTION_URL;
const SECRET = process.env.SECRET;

export default { port, dbUrl, SECRET };
