const Post = require("../models/Post");

exports.post_create_post = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.send("missing required fields");
  } else {
    const newPost = new Post({
      title,
      content,
    });
  }
};
