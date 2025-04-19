import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import {
  Send,
  FileText,
  Inbox,
  LayoutList,
  LogOut,
  User,
} from 'lucide-react';

const AccountDetailsPage = () => {
  const { id } = useParams();

  const [user, setUser] = useState({
    name: 'Loading...',
    role: '',
    email: '', 
    department: '',
    skills: [],
    image: '', 
  });
  
  const [stats, setStats] = useState({
    inboxCount: 0,
    projectCount: 0,
    requestCount: 0,
    postCount: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/users/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        setUser({
          name: data.username || 'Unknown',
          role: data.role || '',
          email: data.email || '', 
          department: data.department || '',
          skills: data.skills || [],
          image: data.image || '', 
        });

        setStats({
          inboxCount: data.inboxCount || 0,
          projectCount: data.projectCount || 0,
          requestCount: data.requestCount || 0,
          postCount: data.postCount || 0,
        });

      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen bg-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading user data...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen bg-white">
          <div className="text-center text-red-500">
            <p>Error loading user data:</p>
            <p className="font-medium">{error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className=''>
      <Header class />
      <div className="flex justify-center items-center items-start min-h-screen bg-white px-10 pt-10">
        <div className="bg-white border border-blue-200 p-8 rounded-3xl shadow-xl w-full max-w-sm flex flex-col items-center">
          <div className="h-28 w-28 bg-blue-100 text-white flex items-center justify-center rounded-full mb-6 shadow-md transition-transform transform hover:scale-105">
            {user.image ? (
              <img
                src={user.image}
                alt="User Avatar"
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <User size={64} color="#3b82f6" />
            )}
          </div>

          <h2 className="text-2xl font-semibold mb-1">{user.name}</h2>

          <p className="text-sm text-blue-600 italic">{user.role}</p>
          <p className="text-sm mt-2 text-gray-700">{user.email}</p>

          <div className="flex justify-between gap-4 mt-8 w-full px-4">
            <div className="flex flex-col items-center text-center">
              <Send className="text-blue-500" size={22} />
              <span className="text-xs mt-1">{stats.requestCount}+ Requests</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Inbox className="text-blue-500" size={22} />
              <span className="text-xs mt-1">{stats.inboxCount} Inbox</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <LayoutList className="text-blue-500" size={22} />
              <span className="text-xs mt-1">{stats.projectCount}+ Projects</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <FileText className="text-blue-500" size={22} />
              <span className="text-xs mt-1">{stats.postCount} Posts</span>
            </div>
          </div>

          <div className="mt-8 w-full bg-blue-50 rounded-xl p-4 text-center shadow-sm">
            <p className="text-sm font-medium text-gray-700 mb-2">
              <span className="font-semibold text-blue-600">Department:</span><br />
              <span className="text-base text-gray-800">{user.department}</span>
            </p>
            <p className="text-sm font-medium text-gray-700 mt-2">
              <span className="font-semibold text-blue-600">Skills:</span>
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {user.skills.length > 0 ? (
                user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-xs">No skills listed</span>
              )}
            </div>
          </div>

          <div className="mt-10 w-full px-4">
            <div className="flex items-center gap-3 hover:bg-red-50 p-2 rounded-xl cursor-pointer transition-all duration-200">
              <LogOut className="text-red-500" size={20} />
              <span className="text-sm font-medium text-red-600">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsPage;