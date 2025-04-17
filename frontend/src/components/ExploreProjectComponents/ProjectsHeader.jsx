import React, { useState } from 'react';
import AddProjectModal from '../ModalComponents/AddProjectModal';
import 'react-toastify/dist/ReactToastify.css';

const ProjectsHeader = ({  showAddProjectModal, setShowAddProjectModal }) => {
  return (
    <>
      <div className="flex items-center justify-between p-4 mx-10 bg-white shadow-sm">
        <span className="text-2xl font-bold text-gray-800">Your Projects</span>
        <div className="flex items-center gap-4">
          
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
