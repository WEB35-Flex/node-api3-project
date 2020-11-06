const express = require("express");

const Posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  // do your magic!
  Posts.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete("/:id", validatePostId, (req, res) => {
  // do your magic!
  Posts.remove(req.post.id)
    .then((count) => {
      res.status(200).json({ message: `the post has been destroyed!` });
    })
    .catch(500)
    .json({ error: err.message });
});

router.put("/:id", validatePostId, (req, res) => {
  // do your magic!
  const changes = req.body;

  Posts.update(req.post.id, req.body)
    .then((count) => {
      res.status(200).json({ message: `${count} resource has been updated.` });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id;

  Posts.getById(id)
    .then((post) => {
      if (post) {
        req.post = post;

        next();
      } else {
        res
          .status(404)
          .json({ message: `Post with id of ${id} does not exist.` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

module.exports = router;
