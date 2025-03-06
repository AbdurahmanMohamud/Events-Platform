const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const eventRoutes = require("./routes/eventRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9090;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/events", eventRoutes);

app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});
