const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { getUserById } = require("./db/users.cjs");

// Create the express server
const server = express();

// Middleware to parse JSON requests
server.use(express.json());

// Middleware to parse URL-encoded data
server.use(bodyParser.urlencoded({ extended: false }));

// Use morgan for logging
server.use(morgan("dev"));

// Serve static files from the 'dist' directory (assuming Vite build output is here)
server.use(express.static(path.join(__dirname, "dist")));

// API routes
const apiRouter = require("./api/index.cjs");
server.use("/api", apiRouter);

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      if (id) {
        const user = await getUserById(id);
        req.user = { id: user.id, username: user.username };
      }
    } catch (error) {
      console.error("JWT verification error:", error);
    }
    next();
  } else {
    next();
  }
});

// Catch-all route to serve index.html for client-side routing
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = { server };
