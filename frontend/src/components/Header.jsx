import React, { useState, useContext, useEffect } from 'react';
import {
  List, Bell, BellRing, X, SquareKanban, SquareMousePointer,
  LayoutList, LayoutDashboard, RefreshCcwDot
} from 'lucide-react';
import Logo from '../assets/logo.png';
import userContext from '../Context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Profile from '../assets/default.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const sidePanelVariants = {
  hidden: (direction) => ({
    x: direction === 'left' ? '-100%' : '100%',
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: (direction) => ({
    x: direction === 'left' ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.3 }
  }),
};

const Header = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [isListOpen, setListOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  const userId = user?.id || '';

  const fetchNotifications = () => {
    if (!userId) return;
    fetch(`http://localhost:8000/notify/${userId}`)
      .then(res => res.json())
      .then(data => {
        const sorted = (data || []).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setNotifications(sorted);
      })
      .catch(err => {});
  };
  
  const handleAccept = (note) => {

    fetch(`http://localhost:8000/notify/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Id: userId, 
        notificationId: note._id, 
        userName: note.username, 
        userId: note.userId, 
        projectId: note.projectId, 
        role: note.role
      }),
    })
    .then(res => res.json())
    .then(data => {
      if (data.message === 'User is already a team member') {
        toast.info(`${note.username} is already a member of the project as ${note.role}`);
      } else {
        fetchNotifications(); 
        toast.info(`${note.username} has been added to the project as ${note.role}`);
      }
    })
    .catch(err =>{});
};

  
  const handleReject = (note) => {
    fetch(`http://localhost:8000/notify/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificationId: note._id, userId: userId}),
    })
      .then(res => res.json())
      .then(data => {
        toast.info("Notification deleted successfully");
        fetchNotifications(); 
      })
      .catch(err =>{});
  };
  

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const navLinks = [
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { to: "/digests", icon: <LayoutList size={20} />, label: "Digests" },
    { to: "/explore-projects", icon: <SquareMousePointer size={20} />, label: "Explore" },
    { to: "/projects", icon: <SquareKanban size={20} />, label: "Projects" },
  ];

  return (
    <div className='justify-between flex items-center p-4 relative'>
      <img src={Logo} alt='Logo' className='h-11 m-0' />

      <div className='navLinks h-12 center items-center bg-sky-50 px-3 rounded-xl gap-6 hidden md:flex'>
        {navLinks.map(({ to, icon, label }) => (
          <div key={to}
            className={`flex items-center gap-1 cursor-pointer text-sm duration-300 ${location.pathname === to ? "text-sky-500" : "text-black hover:text-sky-700"}`}
            onClick={() => navigate(to)}>
            {icon}<p>{label}</p>
          </div>
        ))}
      </div>

      <div className='flex w-fit items-center gap-5 mx-5 bg-sky-100 p-1 px-2 rounded-lg justify-between'>
        <input className='w-[80%] bg-white rounded-xl p-1 border-red hidden sm:flex md:hidden xl:flex' placeholder='Search for something' />
        <List size={20} className='md:hidden cursor-pointer' onClick={() => setListOpen(true)} />
        {
          notifications.length > 0
            ? <BellRing size={20} className='cursor-pointer' onClick={() => setNotificationOpen(true)} />
            : <Bell size={20} className='cursor-pointer' onClick={() => setNotificationOpen(true)} />
        }
        <div className='profile rounded-full h-10 w-10 bg-sky-800 md:w-10 xl:w-12 sm:w-13 cursor-pointer' onClick={() => setProfileOpen(true)}>
          <img src={Profile} alt='Profile' className='rounded-full w-full h-full object-cover' />
        </div>
      </div>

      <AnimatePresence>
        {isListOpen && (
          <>
            <motion.div
              className='fixed inset-0 bg-[#00000090] z-40'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setListOpen(false)}
            />
            <motion.div
              className='w-64 h-full bg-white p-4 shadow-lg fixed left-0 top-0 flex flex-col gap-4 z-50'
              custom='left'
              variants={sidePanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <X size={24} className='cursor-pointer self-end' onClick={() => setListOpen(false)} />
              {navLinks.map(({ to, icon, label }) => (
                <div key={to}
                  className={`flex items-center gap-1 cursor-pointer text-sm duration-300 ${location.pathname === to ? "text-sky-500" : "text-black hover:text-sky-700"}`}
                  onClick={() => navigate(to)}>
                  {icon}<p>{label}</p>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isNotificationOpen && (
          <>
            <motion.div
              className='fixed inset-0 bg-[#00000090] z-40'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotificationOpen(false)}
            />
            <motion.div
              className='min-w-[350px] w-[25%] h-full bg-white p-4 shadow-lg fixed right-0 top-0 flex flex-col gap-4 z-50'
              custom='right'
              variants={sidePanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <X size={24} className='cursor-pointer self-end' onClick={() => setNotificationOpen(false)} />
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold'>Notifications</h2>
                <motion.button
                  className='text-xs bg-sky-500 mr-4 text-white rounded-full hover:bg-sky-700 duration-300'
                  whileTap={{ rotate: 180 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    fetchNotifications();
                  }}>
                  <RefreshCcwDot size={16} className='inline m-1' />
                </motion.button>
              </div>

              {notifications.length > 0 ? (
                <div className='flex flex-col gap-2 overflow-y-auto'>
                  {notifications.map((note, index) => (
                    <motion.div
                    key={index}
                    className='p-3 border border-gray-300 shadow-xs rounded bg-white'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <p className='text-sm font-medium text-black mb-2'>
                      <span className='text-sky-600 font-semibold'>{note.username}</span> has requested to join the <span className='text-sky-600 font-semibold'>{note.projectName}</span> project as a <span className='text-sky-600 font-semibold'>{note.role}</span>. Would you like to approve the request?
                    </p>
                    <p className='text-xs text-gray-500 italic'>
                      {new Date(note.timestamp).toLocaleString()}
                    </p>
                    <div className='flex gap-3 mt-2 justify-end'>
                      <motion.button 
                        whileTap={{ scale: 0.95 }} 
                        className='bg-green-300 hover:bg-green-600 duration-400 text-green-900 text-xs font-semibold px-3 py-1 rounded'
                        onClick={() => {handleAccept(note);fetchNotifications()}}
                      >
                        Accept
                      </motion.button>
                      <motion.button 
                        whileTap={{ scale: 0.95 }} 
                        className='bg-red-300 hover:bg-red-600 duration-200 text-red-900 text-xs font-semibold px-3 py-1 rounded'
                        onClick={() => {handleReject(note);fetchNotifications()} }
                      >
                        Decline
                      </motion.button>
                    </div>
                  </motion.div>                  
                  ))}
                </div>
              ) : (
                <div className='text-sm text-gray-500'>No new notifications</div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProfileOpen && (
          <>
            <motion.div
              className='fixed inset-0 bg-[#00000090] z-40'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
            />
            <motion.div
              className='min-w-[350px] w-[25%] h-full bg-white p-4 shadow-lg fixed right-0 top-0 flex flex-col gap-4 z-50'
              custom='right'
              variants={sidePanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
            >
              <X size={24} className='cursor-pointer self-end' onClick={() => setProfileOpen(false)} />
              <h2 className='text-lg font-semibold'>Profile</h2>
              <div className='text-sm text-gray-500'>Your Profile</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
