const Post = require('../models/Post');

const createPost = async (postData) => {
  const post = new Post(postData);
  return await post.save();
};

const getPosts = async (query = {}) => {
    const filter = {};
  
    if (query.category) {
      const category = await Category.findOne({ name: query.category });
      if (category) {
        filter.categories = category._id;
      }
    }
  
    if (query.tag) {
      filter.tags = query.tag;
    }
  
    return await Post.find(filter)
      .populate('author', 'username')
      .populate('categories', 'name');
  };

const getPostById = async (postId) => {
  return await Post.findById(postId)
    .populate('author', 'username')
    .populate('categories', 'name')
};

const updatePost = async (postId, updateData) => {
  return await Post.findByIdAndUpdate(postId, updateData, { new: true });
};

const deletePost = async (postId) => {
  return await Post.findByIdAndDelete(postId);
};

const likePost = async (postId, action) => {
    const update = action === 'like' 
      ? { $inc: { likes: 1 } } 
      : { $inc: { dislikes: 1 } };
  
    return await Post.findByIdAndUpdate(postId, update, { new: true });
  };
  
module.exports = { createPost, getPosts, getPostById, updatePost, deletePost, likePost };