import express from "express";
import { PORT } from "./config.js";
import indexRoutes from "./routes/task.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.listen(PORT);

app.use(indexRoutes);

console.log(`server is runing on port ${PORT}`);
