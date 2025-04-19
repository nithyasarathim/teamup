const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  upload
} = require('../Controller/postController');

router.get('/get', getAllPosts);             
router.get('/get/:id', getPostById);          
router.post('/create',upload.single('image'), createPost);             
router.delete('/delete/:id', deletePost);        
router.put('/like/:id', likePost);        
router.put('/unlike/:id', unlikePost);    

module.exports = router;
