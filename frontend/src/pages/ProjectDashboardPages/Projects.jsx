import React,{useState} from 'react'
import Header from '../../components/Header'
import ProjectsHeader from '../../components/ExploreProjectComponents/ProjectsHeader';
import ProjectsList from '../../components/ProjectDashboardComponents/ProjectsList'


const Projects = () => {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  return (
    <>
      <Header/>
      <ProjectsHeader showAddProjectModal={showAddProjectModal} setShowAddProjectModal={setShowAddProjectModal}/>
      <ProjectsList showAddProjectModal={showAddProjectModal}/>
    </>
  )
}

export default Projects