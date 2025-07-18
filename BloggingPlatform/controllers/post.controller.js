const postService = require('../services/post');

const createPost = async (req, res) => {
  try {
    const post = await postService.createPost({ ...req.body, author: req.user.id });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts(req.query);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await postService.deletePost(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likePost = async (req, res) => {
    try {
      const { action } = req.body;
      if (!['like', 'dislike'].includes(action)) {
        return res.status(400).json({ error: 'Invalid action. Use "like" or "dislike".' });
      }
  
      const post = await postService.likePost(req.params.id, action);
      if (!post) return res.status(404).json({ error: 'Post not found' });
  
      res.status(200).json({ message: `Post ${action}d successfully`, post });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost, likePost };