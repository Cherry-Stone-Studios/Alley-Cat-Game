//install dotenv on server
require("dotenv").config;

// install and use Express
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { getUserById } = require("./db/users.cjs");

// Create the express server
const server = express();

// Middleware to parse JSON requests
// Middleware to parse URL-encoded data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// nodejs "file system" module where we are saving our morgan log
const fs = require("fs");
// creates a path in our "file system" to the file we are saving our morgan log in
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// middleware for morgan to create a token
morgan.token("type", function (req, res) {
  return req.headers["content-type"];
});

// log morgan on body
server.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :date[web] :type",
    { stream: accessLogStream }
  )
);

// Use morgan for logging
server.use(morgan("dev"));

server.get("/", function (req, res) {
  res.send("Hello world! Cool game coming soon!!");
});

server.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  }
  // else if auth header contains Bearer**
  // create a token for the user
  else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
      const id = verifiedToken.id;

      if (id) {
        const user = await getUserById(id);
        req.user = { id: user.id };
      }
    } catch (error) {
      console.error("JWT verification error:", error);
    }
    next();
  } else {
    next();
  }
});

// API routes
const apiRouter = require("./api/index.cjs");
server.use("/api", apiRouter);

// Serve static files from the 'dist' directory (assuming Vite build output is here)
// server.use(express.static(path.join(__dirname, "dist")));

// Catch-all route to serve index.html for client-side routing
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = { server };
