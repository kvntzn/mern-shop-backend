const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");

app.use(cors());
app.options("*", cors());

const api = process.env.API_URL;

const productsRouter = require("./routers/products");

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use(`${api}/products`, productsRouter);

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connection is ready.."))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log(api);
  console.log("server is t http://localhost:3000");
});
