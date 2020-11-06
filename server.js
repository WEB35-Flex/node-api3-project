const express = require("express");
const morgan = require("morgan");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

server.use(morgan("combined"));
server.use(express.json());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  const message = process.env.MESSAGE;

  res.send(message);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
