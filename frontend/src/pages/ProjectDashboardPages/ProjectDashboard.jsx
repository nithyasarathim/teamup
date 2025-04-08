import React, { useEffect, useState } from 'react';
import KanbanBoard from './KanbanBoard';
import Header from '../../components/Header';
import DashboardHeader from './DashboardHeader';
import { useParams } from 'react-router-dom';

const ProjectDashboard = () => {
  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:8000/projects/${id}`);
        
        if (!res.ok) {
          console.error('Failed to fetch project data');
          return;
        }
        const data = await res.json();
        setProjectData(data);
      } catch (err) {
        console.error('Error fetching project:', err.message);
      }
    };

    fetchProject();
  }, [refresh]);

  const updateTaskColumns = async (updatedColumns) => {
    await fetch(`http://localhost:8000/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: updatedColumns['To Do'],
        onprogress: updatedColumns['Under Progress'],
        review: updatedColumns['Review'],
        done: updatedColumns['Done'],
      }),
    });
  };

  return (
    <div>
      <Header />
      <DashboardHeader data={projectData} setRefresh={setRefresh} refresh={refresh}/>
      {projectData && (
        <KanbanBoard data={projectData} onUpdateColumns={updateTaskColumns} />
      )}
    </div>
  );
};

export default ProjectDashboard;
