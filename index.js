import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import config from "./utils/config.js";
import { errorHandler, unknownEndpoint } from "./middleware/middleware.js";
const app = express();
const port = config.port;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routers
import blogsRouter from "./controllers/blogs.js";
import usersRouter from "./controllers/users.js";
import authRouter from "./controllers/auth.js";
import authorsRouter from "./controllers/authors.js";

// Endpoints
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/authors", authorsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
