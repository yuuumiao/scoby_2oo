require("dotenv").config();
require("./config/dbConnection");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

/*
 * Middlewares
 */

app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL],
  })
);

app.use(logger("dev")); // This logs HTTP reponses in the console.
app.use(express.json()); // Access data sent as json @req.body
app.use(express.urlencoded({ extended: false })); // Access data sent as urlEncoded (standard form or postman) @req.body
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public"))); //This is for developing
app.use(express.static(path.join(__dirname, "public/build"))); //This is for deloying
//if you copy the build file itself into the static foler, change the path to "public/build"
//otherwie if you copy the files in the build file, the path should remain unchanged

app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// 404 Middleware
app.use("/api/*", (req, res, next) => {
  const error = new Error("Ressource not found.");
  error.status = 404;
  next(error);
});

if (process.env.NODE_ENV === "production") {
  app.use("*", (req, res, next) => {
    // If no routes match, send them the React HTML.
    res.sendFile(path.join(__dirname, "public/build/index.html"));
  });
}

/** Routes **/

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const itemRouter = require("./routes/item");

app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/items", itemRouter);

// Error handler middleware
// If you pass an argument to your next function in any of your routes or middlewares
// You will end up in this middleware
// next("toto") makes you end up here
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }
  console.log(err);
  console.log("An error occured");
  res.status(err.status || 500);
  if (!res.headersSent) {
    res.json(err);
  }
});

module.exports = app;
