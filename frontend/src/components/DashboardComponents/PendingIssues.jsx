import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import UserContext from '../../Context/UserContext';

const PendingIssues = () => {
  const { user } = useContext(UserContext);
  const userId = user?.id || '';

  const [projects, setProjects] = useState([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!userId) return;

    fetch('http://localhost:8000/projects/my-projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userId }),
    })
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error fetching projects:', err));
  }, [userId]);

  const getAllTasks = (project) => {
    const sections = ['todo', 'review', 'onprogress'];
    let tasks = [];

    sections.forEach((section) => {
      if (Array.isArray(project[section])) {
        project[section].forEach((task) => {
          if (task.teamMemberID === userId) {
            tasks.push({ ...task, dueTo: section });
          }
        });
      }
    });

    return tasks;
  };

  const getDueInDays = (dueDate) => {
    const due = new Date(dueDate);
    return Math.ceil((due - new Date(today)) / (1000 * 60 * 60 * 24));
  };

  const getDueDateStyle = (dueInDays) => {
    if (dueInDays <= 2) return 'bg-red-100 text-red-600';
    if (dueInDays <= 5) return 'bg-yellow-100 text-yellow-600';
    return 'bg-green-100 text-green-600';
  };

  const getDueToStyle = (type) => {
    if (type === 'todo') return 'bg-red-100 text-red-600';
    if (type === 'onprogress') return 'bg-yellow-100 text-yellow-600';
    if (type === 'review') return 'bg-green-100 text-green-600';
    return '';
  };

  const taskVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
  };

  const tabVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <div className="h-fit col-span-2 shadow-md">
      <div className="bg-white p-2 rounded-md h-fit md:h-[80vh]">
        <div className="flex justify-between p-3 items-center">
          <h2 className="border-b text-left text-lg text-sky-600 font-bold">Pending Issues</h2>
        </div>

        <div className="announcement flex overflow-x-auto gap-2 p-2 my-1 bg-gray-50">
          {projects.map((project, index) => (
            <motion.button
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={tabVariants}
              onClick={() => setSelectedProjectIndex(index)}
              className={`duration-150 ${
                selectedProjectIndex === index
                  ? 'px-3 text-sky-600 border-b font-bold text-md'
                  : 'px-2 text-gray-500 text-sm'
              }`}
            >
              {project.projectName}
            </motion.button>
          ))}
        </div>

        <div className="announcement-list overflow-y-auto h-[64vh] p-2">
          {projects.length > 0 ? (
            getAllTasks(projects[selectedProjectIndex]).length > 0 ? (
              getAllTasks(projects[selectedProjectIndex]).map((task, index) => {
                const dueInDays = getDueInDays(task.enddate);
                const dueDateStyle = getDueDateStyle(dueInDays);
                const dueToStyle = getDueToStyle(task.dueTo);

                return (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={taskVariants}
                    className="p-2 flex items-center shadow-sm my-2 rounded-md"
                  >
                    <div className="flex flex-col align-center space-y-1 flex-grow justify-between">
                      <p className="text-sm font-bold max-w-[220px]">{task.taskName}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        {dueInDays > 0 ? (
                          <span
                            className={`font-bold text-xs w-[120px] text-center rounded-lg p-1 ${dueDateStyle}`}
                          >
                            Due in {dueInDays} days
                          </span>
                        ) : (
                          <span
                            className={`font-bold text-xs w-[120px] text-center rounded-lg p-1 ${dueDateStyle}`}
                          >
                            Task Overdue !
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex">
                      <span
                        className={`font-bold text-xs rounded-full px-2 py-1 ${dueToStyle}`}
                      >
                        {task.dueTo.replace('onprogress', 'On Progress').toUpperCase()}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 mt-4">No tasks assigned for you.</p>
            )
          ) : (
            <p className="text-center text-gray-500 mt-4">No projects is there for you !</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingIssues;
