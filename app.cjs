// listen to the port
// install and use dotenv for the port
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// import the server
const { server } = require("./server.cjs");

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
