const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes");

require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const MONGO_URL_LOCAL = process.env.MONGO_URL_LOCAL;
const OPTION = {
  authSource: "admin",
};

mongoose
  .connect(MONGO_URL_LOCAL, OPTION)
  .then(() => console.log("Connected mongodb"))
  .catch((error) => console.log(error.message));

app.use("/api-docs", require("./_helpers/swagger"));

routes(app);

app.listen(PORT, () => {
  console.log(`DTPC app listening at http://localhost:${PORT}`);
});
