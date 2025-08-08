import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./utils/config.js";
import { errorHandler } from "./middleware/middleware.js";
const app = express();
const port = config.port;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routers
import blogsRouter from "./controllers/blogs.js";

// Endpoints
app.use("/blogs", blogsRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
