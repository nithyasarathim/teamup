//addpostmodel.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { useContext } from 'react';
import UserContext from '../../Context/UserContext';

const AddPostModal = ({ setShowAddPost }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [sending, setSending] = useState(false);
  const { user } = useContext(UserContext);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !category || !description) {
      toast.error('Title, Category, and Description are required!');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    if (image) formData.append('image', image); 
    if (user?.email) formData.append('user', user.email);  
  
    setSending(true);
  
    try {
      const response = await fetch('http://localhost:8000/digest/add', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (response.ok && data.message === 'Post created successfully!') {
        toast.success('Post created successfully!');
        setTitle('');
        setCategory('');
        setDescription('');
        setImage(null);
        setShowAddPost(false);
      } else {
        toast.error(data.message || 'Error creating post.');
      }
    } catch (error) {
      toast.error('Something went wrong while creating the post.');
    } finally {
      setSending(false);
    }
  };
  
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#00000090] flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white rounded-2xl w-[550px] max-w-[90vw] p-6 shadow-lg"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-sky-600">Create a Post</h2>
          <X
            size={26}
            className="text-gray-600 hover:text-black cursor-pointer"
            onClick={() => setShowAddPost(false)}
          />
        </div>

        <form onSubmit={handlePostSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-2 px-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Post title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-2 px-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            >
              <option value="">Select Category</option>
              <option value="hackathon">Hackathon</option>
              <option value="internship">Internship</option>
              <option value="paper_presentation">Paper Presentation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-2 px-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              rows={5}
              placeholder="Write your description..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (Optional)</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                id="image-upload"
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="w-full py-2 px-4 border border-gray-300 rounded-lg cursor-pointer hover:border-sky-500 flex justify-between items-center"
              >
                {image ? (
                  <span className="text-gray-700 truncate">{image.name}</span>
                ) : (
                  <span className="text-gray-500">Choose a file...</span>
                )}
                <span className="text-sky-600">Browse</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddPost(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending}
              className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
            >
              {sending ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddPostModal;