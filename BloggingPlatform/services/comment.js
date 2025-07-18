const Comment = require('../models/Comment');

const addComment = async (postId, commentData) => {
  const comment = new Comment({ ...commentData, post: postId });
  const savedComment = await comment.save();

  if (commentData.parentComment) {
    await Comment.findByIdAndUpdate(commentData.parentComment, {
      $push: { replies: savedComment._id },
    });
  }
  return savedComment;
};

const getCommentsByPost = async (postId) => {
  return await Comment.find({ post: postId, parentComment: null })
    .populate('author', 'username')
    .populate({
      path: 'replies',
      populate: { path: 'author', select: 'username' },
    });
};

module.exports = { addComment, getCommentsByPost };