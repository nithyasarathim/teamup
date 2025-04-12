import React, { useEffect, useState, useContext } from 'react';
import WelcomeImg from '../../assets/WelcomeImg.png';
import { Kanban, Mail, MessageSquare, Presentation } from 'lucide-react';
import UserContext from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StatisticsColumn = () => {
  const { user } = useContext(UserContext);
  const userId = user?.id || '';
  const username = user?.username || "Guest";
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const [stats, setStats] = useState({
    totalProjects: 0,
    currentProjects: 0,
    totalIssues: 0,
  });

  useEffect(() => {
    if (!userId) return;

    fetch('http://localhost:8000/projects/my-projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        const totalProjects = data.length;
        const currentProjects = data.filter(p => p.projectstatus !== 'completed').length;

        let totalIssues = 0;
        data.forEach(project => {
          ['todo', 'onprogress', 'review'].forEach(section => {
            totalIssues += Array.isArray(project[section]) ? project[section].length : 0;
          });
        });

        setStats({ totalProjects, currentProjects, totalIssues });
      })
      .catch(err => console.error('Error:', err));
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:8000/notify/${userId}`)
      .then(res => res.json())
      .then(data => {
        setNotifications(data || []);
        setNotificationsCount(data.length);
      })
      .catch(err => console.error('Error fetching notifications:', err));
  }, [userId]);

  const handleAddPost = () => {
    console.log("Add post triggered");
  };

  const statCardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  const quickLinkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="welcome w-full h-full col-span-3">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="feed-Request flex items-center justify-between w-[95%] min-h-[40vh] max-h-fit rounded-lg mx-4 bg-neutral-50 hover:bg-neutral-100 duration-300 shadow-md p-6"
      >
        <div className="flex flex-col justify-center space-y-4">
          <div className='flex flex-col mx-5'>
            <h1 className="text-md font-bold">Welcome Back</h1>
            <h1 className="text-[28px] font-bold text-sky-600" id="Username">{username} !</h1>
          </div>
          <p className="text-sm text-gray-700 font-bold px-5">
            This is your space to collaborate, track progress, and get things done. Let’s build something great together!
          </p>
          <div className="flex items-center justify-between bg-sky-50 border border-sky-200 px-5 py-3 rounded-lg w-fit shadow-md gap-3">
            <div className="flex items-center bg-sky-50 gap-2">
              <Mail size={22} className="text-sky-600" />
              <span className="text-sky-700 font-semibold">Inbox</span>
            </div>
            <span className="font-bold bg-sky-600 px-3 py-1 text-white rounded-full text-sm shadow">0</span>
          </div>
        </div>
        <img src={WelcomeImg} className="w-[35%] h-auto max-w-xs rounded-lg" alt="Welcome" />
      </motion.div>

      {/* Stats + Quick Links */}
      <div className="w-[95%] grid mx-auto grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="space-y-3">
          {[ 
            { label: 'Total Projects', count: stats.totalProjects, color: 'green' },
            { label: 'Current Projects', count: stats.currentProjects, color: 'sky' },
            { label: 'Total Issues', count: stats.totalIssues, color: 'red' },
            { label: 'Notifications', count: notificationsCount||0, color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={statCardVariants}
              className={`bg-${stat.color}-100 p-2 my-3 flex items-center h-15 rounded-lg shadow-md m-1`}
            >
              <div className={`px-2 py-1 flex items-center justify-center bg-${stat.color}-500 min-w-[32px] text-white text-sm font-bold rounded-full`}>
                {stat.count}
              </div>
              <div className="text-sm ml-3">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className='col-span-2 my-auto'>
          <p className='text-center text-xl font-bold my-4'>Quick Links</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {[
              { icon: <Mail size={24} className='text-red-600' />, label: 'Send Mail' },
              { icon: <Kanban size={24} className='text-purple-600' />, label: 'Board', onClick: () => navigate('/projects') },
              { icon: <MessageSquare size={24} className='text-yellow-600' />, label: 'Add Post', onClick: handleAddPost },
              { icon: <Presentation size={24} className='text-pink-600' />, label: 'Discuss' },
            ].map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={quickLinkVariants}
                onClick={item.onClick}
                className='action-item flex flex-col items-center gap-2 p-3 bg-white hover:bg-gray-100 duration-300 shadow-md rounded-lg cursor-pointer'
              >
                {item.icon}
                <span className='font-semibold text-sm'>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsColumn;
