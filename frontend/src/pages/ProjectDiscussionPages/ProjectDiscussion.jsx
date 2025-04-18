import React from 'react'
import Header from '../../components/Header';
import DiscussStatistics from '../../components/ProjectDiscussionComponents/DiscussStatistics';
import FileStack from '../../components/ProjectDiscussionComponents/FileStack';
import MessageArea from '../../components/ProjectDiscussionComponents/MessageArea';

const ProjectDiscussion = () => {
  return (
    <>
      <Header /> 
      <div className='grid grid-cols-8 mt-3 mx-2 '>
        <DiscussStatistics/>
        <MessageArea/>
        <FileStack/>
      </div> 
    </>
  )
}

export default ProjectDiscussion