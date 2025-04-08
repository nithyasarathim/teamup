import React, { useState } from 'react';
import AddProjectModal from './AddProjectModal';
import { RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

const ProjectsHeader = ({setRefreshTrigger, refreshTrigger}) => {

  const navigate = useNavigate();
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);


  return (
    <>
      <div className="flex items-center justify-between p-4 mx-10 bg-white shadow-sm">
        <span className="text-2xl font-bold text-gray-800">Your Projects</span>
        <div className="flex items-center gap-4">
          <RefreshCw className="cursor-pointer hover:rotate-90 transition-transform duration-300" onClick={()=>{setRefreshTrigger(!refreshTrigger)}} />
          <button
            onClick={() => setShowAddProjectModal(true)}
            className="bg-sky-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-sky-600 transition duration-300"
          >
            Start A New Project
          </button>
        </div>
      </div>

      {showAddProjectModal && (
        <AddProjectModal setShowAddProjectModal={setShowAddProjectModal} />
      )}
    </>
  );
};

export default ProjectsHeader;
