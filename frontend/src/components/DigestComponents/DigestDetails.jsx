import React, { useState } from 'react';
import StockImg from '../../assets/stockimg.jpg';
import { HeartIcon, Heart, MessageSquareIcon, Trash2, Edit2, Save } from 'lucide-react';

const DigestDetails = ({ digestUser, digestName, digestContent }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  const handleLike = () => {
    setLiked(prev => !prev);
    setLikeCount(prev => (liked ? prev - 1 : prev + 1));
  };

  const handlePostComment = () => {
    if (newComment.trim() !== '') {
      setComments(prev => [...prev, { username: 'You', text: newComment }]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (index) => {
    const updated = [...comments];
    updated.splice(index, 1);
    setComments(updated);
  };

  const handleEditComment = (index) => {
    setEditIndex(index);
    setEditedComment(comments[index].text);
  };

  const handleSaveEditedComment = (index) => {
    const updated = [...comments];
    updated[index].text = editedComment;
    setComments(updated);
    setEditIndex(null);
    setEditedComment('');
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto items-start">
      {digestUser && digestName && digestContent ? (
        <>
          <div className="w-full md:w-[35%] max-h-[525px] bg-gray-400 flex items-center justify-center aspect-[9/16] overflow-hidden">
            <img
              src={StockImg}
              alt="digest"
              className="w-full h-full object-contain bg-gray-400"
            />
          </div>

          <div className="w-full md:flex-1 bg-white rounded-2xl shadow-lg p-5">
            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold text-gray-800">{digestName}</h2>
              <p className="text-sm text-gray-500 mt-1">Posted by {digestUser}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-blue-800 font-bold text-md mb-1">DESCRIPTION</h3>
              <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                {digestContent}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-gray-500 text-sm">
              <div className="flex items-center gap-1 cursor-pointer" onClick={handleLike}>
                {liked ? (
                  <Heart className="h-4 w-4 text-pink-600 fill-pink-600" />
                ) : (
                  <HeartIcon className="h-4 w-4 text-pink-600" />
                )}
                {likeCount > 0 && <span>{likeCount}</span>}
              </div>
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-gray-700"
                onClick={() => setShowComments(prev => !prev)}
              >
                <MessageSquareIcon className="h-4 w-4" />
                <span>Comments</span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sky-600 font-bold text-md mb-1">COMMENT</h3>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-2 border rounded-md text-sm outline-none"
                />
                <button
                  onClick={handlePostComment}
                  className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm hover:bg-sky-700"
                >
                  Post
                </button>
              </div>
            </div>

            {showComments && (
              <div className="mt-4 max-h-[300px] overflow-y-auto">
                <div className="space-y-2">
                  {comments.length === 0 ? (
                    <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
                  ) : (
                    comments.map((comment, index) => (
                      <div key={index} className="bg-gray-100 p-2 rounded-md text-sm text-gray-800 flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-sky-600">{comment.username}</p>
                          {editIndex === index ? (
                            <input
                              type="text"
                              value={editedComment}
                              onChange={(e) => setEditedComment(e.target.value)}
                              className="w-full border px-2 py-1 mt-1 text-sm rounded-md"
                            />
                          ) : (
                            <p className="mt-1">{comment.text}</p>
                          )}
                        </div>
                        <div className="flex gap-2 mt-1">
                          {editIndex === index ? (
                            <button onClick={() => handleSaveEditedComment(index)} className="text-green-600">
                              <Save className="h-4 w-4" />
                            </button>
                          ) : (
                            <button onClick={() => handleEditComment(index)} className="text-blue-600">
                              <Edit2 className="h-4 w-4" />
                            </button>
                          )}
                          <button onClick={() => handleDeleteComment(index)} className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full text-center text-gray-500 text-md py-20">
          Please select a digest to view its details.
        </div>
      )}
    </div>
  );
};

export default DigestDetails;
