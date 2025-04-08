import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';

const MyProjects = ({ refreshTrigger }) => {
  const [projects, setProjects] = useState([]);
  const { user } = useContext(UserContext);
  const Id=user?.id||"";
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8000/projects/my-projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: Id }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
      });
  }, [refreshTrigger]);

  const handleProjectClick = (id) => {
    navigate(`/project-dashboard/${id}`);
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
              className="bg-white shadow-md p-5 hover:shadow-lg transition duration-300 rounded-lg cursor-pointer"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 h-16">
                    <th className="text-left text-md font-bold text-black pr-2">
                      {project.projectName}
                    </th>
                    <th className="text-right">
                      <span className="bg-sky-50 text-sky-700 font-semibold text-sm px-2 py-1 rounded-md">
                        {project.projectType}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700">
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
    </div>
  );
};

export default MyProjects;
