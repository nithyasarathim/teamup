import React, { useEffect, useRef, useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

const MessageArea = () => {
  const messageEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState('');
  const [messageList, setMessageList] = useState([
    { 
      id: 1,
      name: 'Alice', 
      message: 'Hey team, any updates?', 
      time: new Date(Date.now() - 3600000).toISOString(),
      isCurrentUser: false
    },
    { 
      id: 2, 
      name: 'Bob', 
      message: 'Working on the bug fix now.', 
      time: new Date(Date.now() - 1800000).toISOString(),
      isCurrentUser: false
    },
    { 
      id: 3, 
      name: 'Charlie', 
      message: 'Designs will be ready by tomorrow.', 
      time: new Date(Date.now() - 1200000).toISOString(),
      isCurrentUser: false
    },
    { 
      id: 4,
      name: 'You', 
      message: 'Great! Keep it going 🔥', 
      time: new Date(Date.now() - 900000).toISOString(),
      isCurrentUser: true
    },
    { 
      id: 5,
      name: 'Bob', 
      message: 'Pushed the fix just now.', 
      time: new Date(Date.now() - 600000).toISOString(),
      isCurrentUser: false
    },
    { 
      id: 6,
      name: 'Charlie', 
      message: 'Updated Figma as well.', 
      time: new Date(Date.now() - 300000).toISOString(),
      isCurrentUser: false
    },
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messageList.length + 1,
      name: 'You',
      message: newMessage,
      time: new Date().toISOString(),
      isCurrentUser: true
    };

    setMessageList([...messageList, newMsg]);
    setNewMessage('');
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    return date.toLocaleDateString();
  };

  const groupedMessages = messageList.reduce((acc, message) => {
    const date = formatDate(message.time);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {});

  return (
    <div className='flex flex-col h-[85vh] col-span-4 mx-3 bg-white rounded-xl shadow-lg overflow-hidden'>
      <div className='flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar'>
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date} className='space-y-4'>
            <div className='flex justify-center'>
              <span className='px-3 py-1 bg-gray-100 text-xs text-gray-500 rounded-full'>{date}</span>
            </div>
            {messages.map((msg) => (
  <div 
    key={msg.id} 
    className={`flex ${msg.isCurrentUser ? 'justify-end' : 'justify-start'}`}
  >
    <div className={`flex gap-3 max-w-xs md:max-w-sm lg:max-w-md ${msg.isCurrentUser ? 'items-end' : 'items-start'}`}>
      {msg.isCurrentUser ? (
        <>
          <span className='text-[10px] mt-1 self-end text-gray-400'>
            {formatTime(msg.time)}
          </span>
          <div className='p-2 rounded-2xl bg-sky-500 text-white'>
            <p className='text-sm'>{msg.message}</p>
          </div>
        </>
      ) : (
        <>
          <div className='p-2 rounded-2xl bg-gray-100'>
            <span className='font-medium text-xs text-gray-700'>{msg.name}</span>
            <p className='text-sm text-gray-800'>{msg.message}</p>
          </div>
          <span className='text-[10px] mt-1 self-end text-gray-500'>
            {formatTime(msg.time)}
          </span>
        </>
      )}
    </div>
  </div>
))}

          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Message Input */}
      <div className='p-3 border-t bg-gray-50'>
        <div className='flex items-center bg-white rounded-full px-4 py-2 shadow-sm'>
          <button className='p-1 text-gray-400 hover:text-gray-600'>
            <Paperclip size={20} />
          </button>
          <button className='p-1 text-gray-400 hover:text-gray-600 ml-2'>
            <Smile size={20} />
          </button>
          <input
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder='Type a message...'
            className='flex-1 border-none outline-none px-3 py-1 text-sm'
          />
          <button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-1 rounded-full ${newMessage.trim() ? 'text-blue-500 hover:text-blue-600' : 'text-gray-300'}`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageArea;
