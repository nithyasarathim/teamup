import React, { useState } from 'react';
import StockImg from '../../assets/stockimg.jpg'; 
import { HeartIcon, Heart, MessageSquareIcon, Trash2, Edit2, Save } from 'lucide-react';
import MyPosts from './MyPosts'; 

const DigestDetails = ({ digestUser, digestName, digestTag, digestContent, timestamp, likes }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    } else {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    }
  };

  const handlePostComment = () => {
    if (newComment.trim() !== '') {
      const commentData = {
        username: 'You', 
        text: newComment
      };
      setComments(prev => [...prev, commentData]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const handleEditComment = (index) => {
    setEditIndex(index);
    setEditedComment(comments[index].text);
  };

  const handleSaveEditedComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].text = editedComment;
    setComments(updatedComments);
    setEditIndex(null);
    setEditedComment('');
  };

  return (
    <div className='flex flex-col md:flex-row gap-6 justify-center items-start px-4'>
      
      <div className='w-full md:w-2/3 bg-white rounded-2xl shadow-lg p-5'>

        <div className='text-center'>
          <h2 className='text-xl font-semibold text-gray-800'>{digestName}</h2>
          <p className='text-sm text-gray-500 mt-1'>Posted by {digestUser}</p>
        </div>

        <div className='flex justify-center mt-4'>
          <div className='w-full h-64 rounded-xl overflow-hidden'>
            <img 
              src={StockImg} 
              alt='digest' 
              className='w-full h-full object-cover object-center' 
            />
          </div>
        </div>
        {/*portrait

        <div className='flex justify-center mt-4'>
          <div className='w-full max-w-xs h-96 rounded-xl overflow-hidden'>
            <img 
              src={StockImg} 
              alt='digest' 
              className='w-full h-full object-cover' 
            />
          </div>
        </div>
        */}

        <div className='mt-6'>
          <h3 className='text-blue-800 font-bold text-md mb-1'>DESCRIPTION</h3>
          <div className='bg-gray-100 p-4 rounded-lg text-sm text-gray-700 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
            {digestContent}
          </div>
        </div>

        <div className='mt-6 flex items-center justify-between text-gray-500 text-sm'>
          <div 
            className='flex items-center gap-1 cursor-pointer'
            onClick={handleLike}
          >
            {liked ? (
              <Heart className='h-4 w-4 text-pink-600 fill-pink-600' />
            ) : (
              <HeartIcon className='h-4 w-4 text-pink-600' />
            )}
            {likeCount > 0 && <span>{likeCount}</span>}
          </div>
          <div 
            className='flex items-center gap-1 cursor-pointer hover:text-gray-700'
            onClick={() => setShowComments(prev => !prev)}
          >
            <MessageSquareIcon className='h-4 w-4' />
            <span>Comments</span>
          </div>
        </div>

        {/* Comment Section */}
        {showComments && (
          <div className='mt-4'>
            <h3 className='text-blue-800 font-bold text-md mb-1'>COMMENTS</h3>
            <div className='space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
              {comments.length === 0 ? (
                <p className='text-sm text-gray-500'>No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className='bg-gray-100 p-2 rounded-md text-sm text-gray-800 flex justify-between items-start'>
                    <div>
                      <p className='font-semibold text-blue-700'>{comment.username}</p>
                      {editIndex === index ? (
                        <input
                          type='text'
                          value={editedComment}
                          onChange={(e) => setEditedComment(e.target.value)}
                          className='w-full border px-2 py-1 mt-1 text-sm rounded-md'
                        />
                      ) : (
                        <p className='mt-1'>{comment.text}</p>
                      )}
                    </div>
                    <div className='flex gap-2 mt-1'>
                      {editIndex === index ? (
                        <button onClick={() => handleSaveEditedComment(index)} className='text-green-600'>
                          <Save className='h-4 w-4' />
                        </button>
                      ) : (
                        <button onClick={() => handleEditComment(index)} className='text-blue-600'>
                          <Edit2 className='h-4 w-4' />
                        </button>
                      )}
                      <button onClick={() => handleDeleteComment(index)} className='text-red-600'>
                        <Trash2 className='h-4 w-4' />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className='mt-2 flex gap-2'>
              <input 
                type='text'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder='Write a comment...'
                className='flex-1 px-3 py-2 border rounded-md text-sm outline-none'
              />
              <button 
                onClick={handlePostComment}
                className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700'
              >
                Post
              </button>
            </div>
          </div>
        )}

      </div>

      <div className='w-full md:w-1/3'>
        <MyPosts />
      </div>
    </div>
  );
};

export default DigestDetails;