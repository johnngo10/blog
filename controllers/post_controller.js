const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

exports.post_get = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .populate("author")
    .then((posts) => res.json(posts))
    .catch((err) => res.status(404).json({ error: "No posts found" }));
};

exports.post_user_get = (req, res) => {
  const { id } = req.params;
  Post.find({ author: id })
    .then((posts) => res.json(posts))
    .catch((err) =>
      res.status(404).json({ error: "No posts found from that user" })
    );
};

exports.post_id_get = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
    .populate("author")
    .populate("comments")
    .then((post) => res.json(post))
    .catch((err) => {
      res.status(404).json({
        error: "No post found with that ID",
      });
    });
};

exports.comment_create_post = async (req, res) => {
  const { comment } = req.body;
  const post = await Post.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!comment) {
    res.status(400).json({ error: "missing required field" });
  } else {
    const newComment = new Comment({
      comment,
    });
    // Something wrong with the line below
    post.comments.push(newComment);
    newComment.author = user.username;
    newComment.post = post;
    await post.save();
    await newComment.save().then((post) => res.json(post));
  }
};

exports.post_create_post = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  const user = await User.findById(id);

  if (!title || !content) {
    res.status(400).json({ error: "missing required fields" });
  } else {
    const newPost = new Post({
      title,
      content,
    });
    user.posts.push(newPost);
    newPost.author = user;
    await user.save();
    await newPost.save().then((post) => res.json(post));
  }
};
