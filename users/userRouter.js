const express = require("express");

const Users = require("./userDb");

const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  // do your magic!
  const newUser = req.body;
  Users.insert(newUser)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // do your magic!
  const newPost = req.body;

  Posts.insert(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/", (req, res) => {
  // do your magic!
  Users.get()
    .then((user) => {
      res.status(200).json({ users: user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  Users.getUserPosts(id).then((posts) => {
    res.status(200).json(posts);
  });
});

router.delete("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  Users.remove(id)
    .then((count) => {
      res.status(200).json(`the user has been destroyed!`);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/:id", validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const changes = req.body;

  Users.update(id, changes)
    .then((count) => {
      res.status(200).json(count);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;

  Users.getById(id)
    .then((user) => {
      if (user) {
        req.user = user;

        next();
      } else {
        res
          .status(404)
          .json({ error: `User with id of ${id} does not exist.` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  const newUser = req.body;

  if (!newUser) {
    res.status(400).json({ message: "missing user data" });
  } else if (!newUser.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const newPost = req.body;

  if (!newPost) {
    res.status(400).json({ message: "missing post data" });
  } else if (!newPost.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
