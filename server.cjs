//install dotenv on server
require("dotenv").config;

// express node to create a server
const express = require("express");
// Create the express server
const server = express();
// path to write record files to
const path = require("path");
// a local file system to record files to
const fs = require("fs");
// nodejs "file system" module where we are saving our morgan log
const { app } = require("faker/lib/locales/en");
// morgan node to log server requests
const morgan = require("morgan");
// bodyParser node to untangle json
const bodyParser = require("body-parser");
// cors node to allow front end to connect to backend even when urls are different
const cors = require("cors");
// import our authorization checks into the server
const { authCheck } = require("./middleware/authorization.cjs");

// run the authorization middleware on the server
server.use(authCheck);

// cors permits the browser to connect to our server
// cors needs to send preflight
// server.use(cors());
server.options("*", cors()); // enable pre-flight request for all requests

// Middleware to parse JSON requests
// Middleware to parse URL-encoded data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

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

// Use morgan for additional logging on dev
server.use(morgan("dev"));

// // API routes
// const apiRouter = require("./api/index.cjs");
// server.use("/api", apiRouter);

// Serve static files from the 'dist' directory (assuming Vite build output is here)
// server.use(express.static(path.join(__dirname, "dist")));

// Catch-all route to serve index.html for client-side routing
// server.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });

//<-----ROUTES------>
//Backend
server.use("/api", require("./api/index.cjs"));

//Frontend
server.use(express.static("./dist"));
server.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

module.exports = { server };
