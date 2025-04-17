import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import { toast } from 'react-toastify';
import { Trash2 } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const ProjectsList = ({ showAddProjectModal }) => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const { user } = useContext(UserContext);
  const Id = user?.id || '';
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/projects/my-projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: Id }),
    })
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error('Error fetching projects:', err));
  }, [showAddProjectModal]);

  const handleProjectClick = (id) => {
    navigate(`/project-dashboard/${id}`);
  };

  const openModal = (e, id) => {
    e.stopPropagation();
    setProjectToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/projects/delete/${projectToDelete}`, {
        method: 'DELETE',
      });
      console.log(projectToDelete)
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p._id !== projectToDelete));
        toast.info("Project deleted successfully");
        if (typeof refreshTrigger === 'function') {
          refreshTrigger();
        }
      } else {
        toast.error("Failed to delete project");
      }
    } catch (err) {
      console.error('Error deleting project:', err);
      toast.error("Error deleting project");
    } finally {
      setShowModal(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const totalIssues =
            (project.todo?.length || 0) +
            (project.onprogress?.length || 0) +
            (project.review?.length || 0);

          return (
            <div
              key={index}
              onClick={() => handleProjectClick(project._id)}
              className="bg-white shadow-md p-5 hover:shadow-lg transition duration-300 rounded-lg cursor-pointer relative"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-md font-bold text-black">{project.projectName}</h2>
                {project.teamLeadId === Id && (
                  <button
                    onClick={(e) => openModal(e, project._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
  )}
</div>


              <table className="w-full border-collapse">
                <thead>
                  
                </thead>
                <tbody className="text-sm text-gray-700">
                  <tr className="border-t border-gray-200">
                    <td className="py-2 font-medium">Project Type</td>
                    <td className="py-2 text-right">
                      <span className="bg-teal-100 text-gold px-2 py-1 rounded-lg text-sm font-semibold">
                        {project.projectType}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 font-medium">Team</td>
                    <td className="py-2 text-right">{project.teamName}</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 font-medium">Team Lead</td>
                    <td className="py-2 text-right">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm font-semibold">
                        {project.teamLeadName}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 font-medium">Duration</td>
                    <td className="py-2 text-right">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-lg text-xs font-medium">
                        {project.projectDuration} months
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 font-medium">Status</td>
                    <td className="py-2 text-right">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg text-xs font-medium">
                        {project.projectStatus}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 font-medium">Total Issues</td>
                    <td className="py-2 text-right">
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-xs font-medium">
                        {totalIssues} total issues
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000090] bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Deletion</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-1 bg-red-400 hover:bg-red-600 rounded-md text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
