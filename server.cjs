// install and use Express
const express = require("express");
const server = express();

// install and use Morgan
const morgan = require("morgan");
server.use(morgan("dev"));

// nodejs "file system" module where we are saving our morgan log
const fs = require("fs");
// creates a path in our "file system" to the file we are saving our morgan log in
const path = require("path");
// creates a path for the log data to be written to
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

server.get("/", function (req, res) {
  res.send("Hello world! Cool game coming soon!!");
});

// install and use body-parser
const bodyParser = require("body-parser");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

//Parse the headers to see if there is a token on the user ID
// requires getUserById
// requires jsonwebtoken

const { getUserById } = require("./db/users.cjs");
const jwt = require("jsonwebtoken");

// generate and server.use an Express Router for the API
const apiRouter = require("./api/index.cjs");
server.use("/api", apiRouter);

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  //if no authorization provided, do next
  if (!auth) {
    next();
  }
  // else if auth header contains Bearer
  // create a token for the user
  else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    //if token provided, create a deconstructed id using the token and jwt secret
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    // if the user id is provided by jwt
    if (id) {
      // on validation from a login request, getUserById with the verified jwt id
      // set the logged-in user to be the user
      // then do next
      const user = await getUserById(id);
      req.user = { id: user.id, username: user.username };
      next();
    }
    // else do next
    else {
      next();
    }
  } // else do next
  else {
    next();
  }
});

module.exports = { server };
