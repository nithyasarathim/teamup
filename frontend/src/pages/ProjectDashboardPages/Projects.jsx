import React,{useState} from 'react'
import Header from '../../components/Header'
import ProjectsHeader from '../../components/ExploreProjectComponents/ProjectsHeader';
import ProjectsList from '../../components/ProjectDashboardComponents/ProjectsList'

const Projects = () => {
  const [refreshTrigger, setRefreshTrigger] =useState(false);
  return (
    <>
      <Header/>
      <ProjectsHeader setRefreshTrigger={setRefreshTrigger} refreshTrigger={refreshTrigger}/>
      <ProjectsList refreshTrigger={refreshTrigger}/>
    </>
  )
}

export default Projects