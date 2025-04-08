import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleX } from 'lucide-react';
import  UserContext from '../../Context/UserContext';

const ProjectDetailModal = ({ project, onClose }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [selectedRole, setSelectedRole] = useState('');

  const handleNavigate = () => {
    navigate(`/profile/${project?.teamLeadName?.toLowerCase().replaceAll(" ", "-")}`);
  };

  const handleAskToJoin = () => {
    if (!selectedRole) {
      alert("Please select a role before joining!");
      return;
    }
    console.log("Project id :", project._id);
    console.log("User:", user.username);
    console.log("User ID:", user.id);
    console.log("Team Lead ID:", project.teamLeadId);
    console.log("Selected Role:", selectedRole);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='bg-[#00000099] fixed inset-0 flex items-center justify-center z-50'
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className='h-[80%] w-[60%] min-w-[300px] bg-white rounded-lg shadow-2xl p-6 overflow-y-auto'
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{project.projectName}</h2>
              <button
                onClick={onClose}
                className="text-red-500 font-semibold hover:underline"
              >
                <CircleX className='text-red-700' />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="flex justify-between items-center p-3 rounded-lg">
                <div className="font-medium">Team Name</div>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  {project.teamName}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg">
                <div className="font-medium">Team Lead</div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {project.teamLeadName}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg">
                <div className="font-medium">Project Type</div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {project.projectType}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg">
                <div className="font-medium">Duration</div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  {project.projectDuration} month
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg">
                <div className="font-medium">Status</div>
                <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full">
                  {project.projectStatus}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-lg">
                <div className="font-medium">Team Size</div>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                  {project.teamMembers?.length || 0}
                </span>
              </div>

              <div className="col-span-2 flex justify-between items-start p-3 rounded-lg">
                <div className="font-medium">Skills</div>
                <div className="flex gap-2 flex-wrap justify-end">
                  {project.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-2 flex justify-between items-start p-3 rounded-lg">
                <div className="font-medium">Roles</div>
                <div className="flex gap-2 flex-wrap justify-end">
                  {project.roles.map((role, i) => (
                    <span
                      key={i}
                      className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="col-span-2 flex justify-between items-start p-3 rounded-lg">
                <div className="font-medium">Current Team</div>
                <div className="flex gap-2 flex-wrap justify-end">
                  {project.teamMembers.map((member, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(`/profile/${member.userid}`)}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs font-medium hover:underline"
                    >
                      {member.name} - {member.role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="col-span-2 flex justify-between items-center p-3 rounded-lg mt-2">
                {project.referenceLink ? (
                  <button
                    onClick={handleNavigate}
                    className="bg-sky-600 text-white px-4 py-2 rounded-md text-sm hover:bg-sky-700"
                  >
                    Project Purpose
                  </button>
                ) : (
                  <span className="text-gray-400 italic">No reference link</span>
                )}

                {/* Role Select and Join Button */}
                <div className="flex items-center gap-3">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border border-gray-300 px-3 py-2 rounded-md text-sm"
                  >
                    <option value="">Select Role</option>
                    {project.roles.map((role, i) => (
                      <option key={i} value={role}>{role}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleAskToJoin}
                    className="bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700"
                  >
                    Ask to Join
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
