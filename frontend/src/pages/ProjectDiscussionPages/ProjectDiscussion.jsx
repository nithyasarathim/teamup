import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import io from 'socket.io-client';
import Header from '../../components/Header';
import DiscussStatistics from '../../components/ProjectDiscussionComponents/DiscussStatistics.jsx';
import FileStack from '../../components/ProjectDiscussionComponents/FileStack.jsx';
import MessageArea from '../../components/ProjectDiscussionComponents/MessageArea.jsx';

const socket = io('http://localhost:8000'); 

const ProjectDiscussion = () => {
  const { id } = useParams();
  const [discussionData, setDiscussionData] = useState({
    messages: [],
    files: [],
    teamMembers: [],
    projectName: '',
  });

  useEffect(() => {
    if (!id) return;

    socket.emit('joinRoom', id);

    const fetchDiscussionData = async () => {
      try {
        const res = await fetch('http://localhost:8000/discuss/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ projectId: id }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Something went wrong');

        setDiscussionData(data);
      } catch (err) {
        console.error('Error fetching discussion data:', err.message);
      }
    };

    fetchDiscussionData();

    socket.on('receiveMessage', (newMessage) => {
      setDiscussionData((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));
    });

    socket.on('receiveFile', (newFile) => {
      setDiscussionData((prev) => ({
        ...prev,
        files: [...prev.files, newFile],
      }));
    });

    socket.on('deleteMessage', (messageId) => {
      setDiscussionData((prev) => ({
        ...prev,
        messages: prev.messages.filter((msg) => msg._id !== messageId),
      }));
    });

    socket.on('deleteFile', (fileId) => {
      setDiscussionData((prev) => ({
        ...prev,
        files: prev.files.filter((file) => file._id !== fileId),
      }));
    });

    console.log(discussionData);

    return () => {
      socket.emit('leaveRoom', id);
      socket.off('receiveMessage');
      socket.off('receiveFile');
      socket.off('deleteMessage');
      socket.off('deleteFile');
    };
  }, [id]);

  return (
    <>
      <Header /> 
      <div className='grid grid-cols-8 mt-3 mx-2 '>
        
        <DiscussStatistics teamMembers={discussionData.teamMembers} projectName={discussionData.projectName} />
        <MessageArea data={discussionData} />
        <FileStack data={discussionData} />
      </div> 
    </>
  );
}

export default ProjectDiscussion;
