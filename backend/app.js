import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"

import eventRoutes from "./routes/eventRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/events", eventRoutes)

app.listen(PORT, () => {
  console.log("server is listening on port "+PORT);
});
