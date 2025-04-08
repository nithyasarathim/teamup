import React, { useState } from 'react';
import { Info, AlertTriangle } from 'lucide-react'; // Updated icons

const PendingIssues = () => {
  const months = ['Library management', 'Storage management', 'Library management', 'Storage management'];
  const currentMonthIndex = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex);
  
  const today = new Date().toISOString().split('T')[0]; 

  const events = {
    "Library management": [
      { "due-date": "2025-04-08", "due-time": "10:00 AM", "name": "Do the login UI/UX"},
      { "due-date": "2025-04-13", "due-time": "10:00 AM", "name": "Fix database schema"},
      { "due-date": "2025-04-14", "due-time": "10:00 AM", "name": "Update API endpoints"},
      { "due-date": "2025-04-12", "due-time": "10:00 AM", "name": "Implement search feature in the window terminal of the linux"}
    ],
    "Feb": [],
    "Mar": [
      { "due-date": "2025-03-05", "due-time": "2:00 PM", "name": "Spring Fest"},
      { "due-date": "2025-03-15", "due-time": "10:00 AM", "name": "New Year Celebration"},
      { "due-date": "2025-03-28", "due-time": "3:00 PM", "name": "Tech Talk"},
      { "due-date": "2025-01-15", "due-time": "10:00 AM", "name": "New Year Celebration"},
      { "due-date": "2025-01-28", "due-time": "3:00 PM", "name": "Tech Talk"},
    ]
  };

  const getDueInDays = (dueDate) => {
    const due = new Date(dueDate);
    return Math.ceil((due - new Date(today)) / (1000 * 60 * 60 * 24));
  };

  const getDueDateStyle = (dueInDays) => {
    if (dueInDays <= 2) return 'bg-red-100 text-red-600'; // Urgent
    if (dueInDays <= 5) return 'bg-yellow-100 text-yellow-600'; // Upcoming
    return 'bg-green-100 text-green-600'; // Not urgent
  };

  return (
    <div className='h-fit col-span-2 shadow-md'>
      <div className="bg-white p-2 rounded-md h-fit md:h-[80vh]">
        <div className='flex justify-between p-3 items-center'>
          <h2 className='border-b text-left text-lg text-sky-600 font-bold'>Pending Issues</h2>
        </div>
        <div className='announcement flex overflow-x-auto gap-2 p-2 my-1 bg-gray-50'>
          {months.map((month, index) => (
            <button 
              key={index} 
              onClick={() => setSelectedMonth(index)} 
              className={`duration-150 ${selectedMonth === index ? 'px-3 text-sky-600 border-b font-bold text-md' : 'px-2 text-gray-500 text-sm'}`}
            >
              {month}
            </button>
          ))}
        </div>
        
        <div className='announcement-list overflow-y-auto h-[55vh] p-2'>
          {events[months[selectedMonth]] && events[months[selectedMonth]].length > 0 ? (
            events[months[selectedMonth]].map((event, index) => {
              const dueInDays = getDueInDays(event["due-date"]);
              const dueDateStyle = getDueDateStyle(dueInDays);

              return (
                <div key={index} className={`p-2 flex items-center gap-4 my-3 rounded-md`}>
                  <div className='flex flex-col align-center flex-grow justify-between'>
                    <p className='text-sm font-bold max-w-[220px]'>{event.name}</p>
                    <div className='flex justify-between text-sm text-gray-500'>
                      <span>Due at {event["due-time"]}</span>
                    </div>
                  </div>
                  <span className={`font-bold text-sm w-[125px] text-center rounded-lg p-1 ${dueDateStyle}`}>
                    Due in {dueInDays} days
                  </span>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500 mt-4">No tasks assigned for you!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingIssues;
