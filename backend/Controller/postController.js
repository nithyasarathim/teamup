const Post = require('../models/Post');
const { emitPostEvent } = require('../socket');


const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};


const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
};


const createPost = async (req, res) => {
  try {
    const { username, title, description, category, image } = req.body;

    if (!username || !title || !description || !category) {
      return res.status(400).json({ error: 'All fields except image are required' });
    }

    const newPost = new Post({ username, title, description, category, image });
    await newPost.save();
    emitPostEvent('newPost', newPost);

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};


const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json({ message: 'Post deleted successfully' });
    emitPostEvent('postDeleted', req.params.id);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};


const likePost = async (req, res) => {
  const { userId } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'Already liked by this user' });
    }

    post.likes += 1;
    post.likedBy.push(userId);
    await post.save();
    emitPostEvent('postLiked', { postId: post._id, likes: post.likes });


    res.status(200).json({ message: 'Post liked' });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post' });
  }
};


const unlikePost = async (req, res) => {
  const { userId } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'User has not liked this post' });
    }

    post.likes -= 1;
    post.likedBy = post.likedBy.filter(id => id !== userId);
    await post.save();
    emitPostEvent('postUnliked', { postId: post._id, likes: post.likes });

    res.status(200).json({ message: 'Post unliked' });
  } catch (error) {
    res.status(500).json({ message: 'Error unliking post' });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  likePost,
  unlikePost,
};
