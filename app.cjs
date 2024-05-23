// listen to the port
// install and use dotenv for the port
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// import the server
const { server } = require("./server.cjs");

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

// Default to 404 if no other route matched
server.use((req, res) => {
  res.status(404).send("Path not found.");
});

module.exports = { server };
