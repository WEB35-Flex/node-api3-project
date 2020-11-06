// code away
const server = require("./server");

const port = 8000;

server.listen(port, (req, res) => {
  console.log(`\n*** Server Running on Port ${port} ***\n`);
});
