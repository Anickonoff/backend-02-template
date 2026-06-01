const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");
const { logMethodMiddleware } = require("./middlewares/logRequests");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { errorHandler } = require("./middlewares/errorHandler");

dotenv.config();
const {
  PORT = 3000,
  API_URL = "http://localhost",
  DB_HOST = "localhost",
  DB_PORT = 27017,
} = process.env;

const corsOptions = {
  origin: "http://localhost",
  methods: ["GET", "HEAD", "POST", "PATCH", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Origin",
    "X-Requested-With",
    "Accept",
  ],
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(logMethodMiddleware);
app.use(userRouter);
app.use(bookRouter);

app.get("/", (req, res) => {
  res.status(200);
  res.send("Hello World");
});

app.use((req, res) => {
  res.status(404);
  res.send("Page Not Found");
});
app.use(errorHandler);

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
