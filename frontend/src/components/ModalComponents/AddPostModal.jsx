import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import UserContext from '../../Context/UserContext';

const AddPostModal = ({ setShowAddPost, onPostCreated }) => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: user?.name || '', // Assuming user.id is the username
    title: '',
    category: '',
    description: '',
    link: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.description || !imageFile) {
      toast.error('All fields including image are required, except link which is optional');
      return;
    }

    if (!user?.id) {
      toast.error('You must be logged in to create a post');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', user.id); // Using user.id as username
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('link', formData.link || '');
      formDataToSend.append('image', imageFile);

      const response = await fetch('http://localhost:8000/post/create', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post');
      }

      toast.success('Post created successfully!');
      setShowAddPost(false);
      onPostCreated?.(data.post);
      
      setFormData({
        username: user.name,
        title: '',
        category: '',
        description: '',
        link: ''
      });
      setImageFile(null);
      setPreviewImage(null);

    } catch (error) {
      toast.error(error.message || 'Error creating post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Create New Post</h2>
          <button 
            onClick={() => !isSubmitting && setShowAddPost(false)}
            className={`text-gray-500 hover:text-gray-700 ${isSubmitting ? 'opacity-50' : ''}`}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select category</option>
              <option value="Hackathon">Hackathon</option>
              <option value="Internship">Internship</option>
              <option value="Paper Presentation">Paper Presentation</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Link (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-1">Link (Optional)</label>
            <input
              name="link"
              type="url"
              value={formData.link}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image *</label>
            <div className="flex items-center gap-4">
              <label className={`cursor-pointer ${!imageFile ? 'border-2 border-dashed p-2 rounded' : ''}`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
                {imageFile ? (
                  <div className="relative">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setPreviewImage(null);
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-500">Click to upload image</span>
                )}
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddPost(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddPostModal;