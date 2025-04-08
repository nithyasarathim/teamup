import React,{useState} from 'react'
import Header from '../../components/Header'
import ProjectsHeader from './ProjectsHeader'
import ProjectsList from './ProjectsList'

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