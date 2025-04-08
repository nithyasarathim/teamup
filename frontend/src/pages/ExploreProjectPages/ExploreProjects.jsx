import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import ProjectDetailModal from './ProjectDetailModal';

const ExploreProjects = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/projects/explore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}), 
        });

        if (!response.ok) throw new Error('Failed to fetch projects');

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowProjectDetail(true);
  };

  const filteredProjects = projects.filter((project) => {
    const matchType = selectedType ? project.projectType === selectedType : true;
    const matchSkill = selectedSkill
      ? project.skills.some((skill) =>
          skill.toLowerCase().includes(selectedSkill.toLowerCase())
        )
      : true;
    const matchRole = selectedRole
      ? project.roles.some((role) =>
          role.toLowerCase().includes(selectedRole.toLowerCase())
        )
      : true;
    return matchType && matchSkill && matchRole && project.teamMembers.length < project.teamSize;
  });

  return (
    <div>
      <Header />

      <div className="p-4 flex justify-center flex-wrap gap-4">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border px-4 py-2 rounded-md text-sm w-1/5"
        >
          <option value="">All Project Types</option>
          <option value="Hackathon">Hackathon</option>
          <option value="College Project">College Project</option>
          <option value="Personal Project">Personal Project</option>
          <option value="Paper Publication">Paper Publication</option>
          <option value="Open Innovation">Open Innovation</option>
        </select>

        <input
          type="text"
          placeholder="Search by Skill"
          value={selectedSkill}
          onChange={(e) => setSelectedSkill(e.target.value)}
          className="border px-4 py-2 rounded-md text-sm w-1/5"
        />

        <input
          type="text"
          placeholder="Search by Role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border px-4 py-2 rounded-md text-sm w-1/5"
        />
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600">Loading projects...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">Error: {error}</div>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-5 hover:shadow-lg transition duration-300 rounded-lg"
              onClick={() => handleProjectClick(project)}
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
                    <td className="py-2 font-medium">Team Lead</td>
                    <td className="py-2 text-right">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-semibold">
                        {project.teamLeadName}
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 font-medium align-top">Skills</td>
                    <td className="py-2 flex flex-wrap gap-1 justify-end">
                      {project.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 font-medium">Duration</td>
                    <td className="py-2 text-right">{project.projectDuration} month</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 font-medium">Status</td>
                    <td className="py-2 text-right">{project.projectStatus}</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 font-medium align-top">Roles</td>
                    <td className="py-2 flex flex-wrap gap-1 justify-end">
                      {project.roles.map((role, i) => (
                        <span
                          key={i}
                          className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {role}
                        </span>
                      ))}
                    </td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="py-2 font-medium">Team Size</td>
                    <td className="py-2 text-right flex justify-end gap-2">
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                        Needed: {project.teamSize}
                      </span>
                      <span className="bg-rose-100 text-rose-800 px-2 py-1 rounded-full text-xs font-medium">
                        Available: {project.teamMembers.length}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {showProjectDetail && selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setShowProjectDetail(false)}
        />
      )}
    </div>
  );
};

export default ExploreProjects;
