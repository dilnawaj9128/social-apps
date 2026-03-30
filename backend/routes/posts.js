const router = require("express").Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

router.post("/", async (req, res) => {
  const post = await Post.create({ text: req.body.text });
  res.json(post);
});

module.exports = router;