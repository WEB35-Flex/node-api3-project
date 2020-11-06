// code away
require("dotenv").config();

const server = require("./server");

const port = process.env.PORT || 8000;

server.listen(port, (req, res) => {
  console.log(`\n*** Server Running on Port ${port} ***\n`);
});
