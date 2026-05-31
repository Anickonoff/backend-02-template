const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
const {
  PORT = 3000,
  API_URL = "http://localhost",
  DB_HOST = "localhost",
  DB_PORT = 27017,
} = process.env;

const app = express();

// app.use(cors);
app.use(bodyParser.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello World");
});

mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/mydb`)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Ссылка на сервер: ${API_URL}:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
