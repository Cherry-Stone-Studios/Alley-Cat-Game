require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { server } = require("./server.cjs");

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
