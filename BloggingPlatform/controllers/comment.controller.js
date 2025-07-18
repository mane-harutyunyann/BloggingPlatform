const commentService = require('../services/comment');

const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commentData = { ...req.body, author: req.user.id };
    const comment = await commentService.addComment(postId, commentData);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await commentService.getCommentsByPost(postId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addComment, getCommentsByPost };