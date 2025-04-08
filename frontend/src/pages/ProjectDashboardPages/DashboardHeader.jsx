import { Figma, Github } from 'lucide-react';
import React, { useState } from 'react';
import AddTaskModal from '../../components/ProjectComponents/AddTaskModal';
import { RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';

const DashboardHeader = ({ data, setRefresh, refresh }) => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const handleOpenLink = (url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-white p-4 flex items-center justify-between shadow-sm">
      <h1 className="text-xl font-bold mx-4">
        {data?.projectName || "Project Name"}
      </h1>

      <div className="flex items-center gap-4">
        <div
          className="p-2 rounded-full bg-sky-50 hover:bg-sky-100 hover:rotate-90 hover:duration-300 cursor-pointer"
          onClick={() => setRefresh(!refresh)}
        >
          <RefreshCw className="text-sky-900" size={20} />
        </div>

        <button className="px-4 py-1 bg-sky-50 text-sm rounded-lg hover:bg-sky-100" onClick={()=>{toast.info("Hang tight ! Coming soon !")}}>
          Discuss
        </button>

        <button className="px-4 py-1 bg-sky-50 text-sm rounded-lg hover:bg-sky-100">
          Backlog
        </button>

        <button
          className="px-4 py-1 bg-sky-50 text-sm rounded-lg hover:bg-sky-100"
          onClick={() => setShowAddTaskModal(true)}
        >
          Add Task
        </button>

        <button
          className="px-4 py-1 bg-sky-50 text-sm rounded-lg hover:bg-sky-100"
          onClick={() => handleOpenLink(data?.referencelink)}
        >
          Motive
        </button>

        <div
          className="p-2 rounded-full bg-sky-50 hover:bg-sky-100 cursor-pointer"
          onClick={() => handleOpenLink(data?.projectlink)}
        >
          <Github className="text-sky-900" size={20} />
        </div>

        <div
          className="p-2 rounded-full bg-sky-50 hover:bg-sky-100 cursor-pointer"
          onClick={() => handleOpenLink(data?.prototypelink)}
        >
          <Figma className="text-sky-900" size={20} />
        </div>
      </div>

      {showAddTaskModal && (
        <AddTaskModal
          data={data}
          setShowAddTaskModal={setShowAddTaskModal}
        />
      )}
    </div>
  );
};

export default DashboardHeader;
