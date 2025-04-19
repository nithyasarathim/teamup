import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, LogOut, HelpCircle, FileText, Pencil, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const ProfilePage = ({ onClose, user, updateUser }) => {
  const [showHelp, setShowHelp] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.name || '');
  const [newImage, setNewImage] = useState(user?.image || '');
  const navigate = useNavigate();

  const handleAccountDetailsClick = () => {
    onClose();
    navigate(`/profile/${user?.id}`);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (typeof updateUser === 'function') {
      updateUser({
        ...user,
        name: newUsername,
        image: newImage,
      });
      setIsEditing(false);
    } else {
      console.error('updateUser is not a function');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-[#00000080] z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Side Panel */}
      <motion.div
        className="w-[350px] h-full fixed right-0 top-0 bg-white text-gray-900 shadow-xl z-50 overflow-y-auto rounded-3xl"
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col items-center relative mt-12">
          <X
            className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
          />

          {/* Avatar with Bluish Background */}
          <div className="h-28 w-28 bg-blue-100 text-white flex items-center justify-center rounded-full mb-6 shadow-md transition-transform transform hover:scale-105 relative">
            {isEditing ? (
              <>
                <label htmlFor="image-upload" className="cursor-pointer absolute inset-0 flex items-center justify-center">
                  <User size={48} color="#3b82f6" />
                </label>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="image-upload"
                />
              </>
            ) : newImage ? (
              <img
                src={newImage}
                alt="User Avatar"
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <User size={64} color="#3b82f6" />
            )}
          </div>

          {/* User Info */}
          <div className="flex items-center gap-2">
            {isEditing ? (
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="text-2xl font-semibold text-center border-b-2 border-blue-500 outline-none"
              />
            ) : (
              <h2 className="text-2xl font-semibold">{newUsername || 'Test1'}</h2>
            )}
            <Pencil
              size={18}
              color="#3b82f6"
              className="cursor-pointer hover:scale-110 transition-transform"
              title="Edit Profile"
              onClick={handleEditClick}
            />
          </div>
          <p className="text-sm text-blue-600 italic">{user?.role || 'UI Designer'}</p>
          <p className="text-sm mt-2">{user?.email || 'Test1@sece.ac.in'}</p>

          {/* Menu Items */}
          <div className="w-full bg-white rounded-xl mt-6 px-6 py-6 flex flex-col gap-6 shadow-lg">
            <div
              className="flex items-center gap-3 text-sm cursor-pointer hover:text-blue-600 transition-all"
              onClick={handleAccountDetailsClick}
            >
              <FileText size={18} color="#2563eb" /> Account Details
            </div>

            <div>
              <div
                className="flex items-center gap-3 text-sm cursor-pointer hover:text-blue-600 transition-all"
                onClick={() => setShowHelp(!showHelp)}
              >
                <HelpCircle size={18} color="#0ea5e9" /> Help
              </div>
              {showHelp && (
                <div className="mt-2 ml-8 text-sm text-gray-600">
                  For more info, contact{' '}
                  <span className="text-blue-600">teamup@gmail.com</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-3 text-sm text-red-500 cursor-pointer hover:underline transition-all">
              <LogOut size={18} color="#ef4444" /> Log out
            </div>
          </div>

          {isEditing && (
            <button
              onClick={handleSaveClick}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Save Changes
            </button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ProfilePage;