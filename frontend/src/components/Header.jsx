import React, { useState } from 'react';
import { Home, List, User, Users, Building, BellDot, X , SquareKanban, SquareMousePointer, LayoutList, LayoutDashboard } from 'lucide-react';
import Logo from '../assets/logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import Profile from '../assets/default.jpg';

const Header = () => {
  const navigate= useNavigate();
  const [isListOpen, setListOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const location= useLocation();
  return (
    <div className='justify-between flex items-center p-4 relative'>
      <img src={Logo} alt='Logo' className='h-11 m-0' />
      <div className='navLinks h-12 center items-center bg-sky-50 px-3 rounded-xl gap-6 hidden md:flex'>
        <div className={`flex items-center gap-1 cursor-pointer text-sm duration-300  ${location.pathname==="/dashboard"?"text-sky-500":"text-black hover:text-sky-700"}`} onClick={()=>{navigate("/dashboard")}}><LayoutDashboard size={20}/><p>Dashboard</p></div>
        <div className={`flex items-center gap-1 cursor-pointer text-sm duration-300  ${location.pathname==="/digests"?"text-sky-500":"text-black hover:text-sky-700"}`} onClick={()=>{navigate("/digests")}}><LayoutList size={20} /><p>Digests</p></div>
        <div className={`flex items-center gap-1 cursor-pointer text-sm duration-300  ${location.pathname==="/explore-projects"?"text-sky-500":"text-black hover:text-sky-700"}`} onClick={()=>{navigate("/explore-projects")}}><SquareMousePointer size={20} /><p>Explore</p></div>
        <div className={`flex items-center gap-1 cursor-pointer text-sm duration-300  ${location.pathname==="/projects"?"text-sky-500":"text-black hover:text-sky-700"}`} onClick={()=>{navigate("/projects")}}><SquareKanban size={20} /><p>Projects</p></div>
      </div>
    
      <div className='flex w-fit items-center gap-5 mx-5 bg-sky-100 p-1 px-2 rounded-lg justify-between'>
        <input className='w-[80%] bg-white rounded-xl p-1 border-red hidden sm:flex md:hidden xl:flex' placeholder='Search for something'></input>
        <List size={20} className='md:hidden cursor-pointer' onClick={() => setListOpen(true)} />
        <BellDot size={20} className='cursor-pointer' onClick={() => setNotificationOpen(true)} />
        <div className='profile rounded-full h-10 w-10 bg-sky-800 md:w-10 xl:w-12 sm:w-13' onClick={()=>setProfileOpen(true)}><img src={Profile}/></div>
      </div>

      {isListOpen && (
        <div className='fixed inset-0 min-w-[350px] w-[25%] bg-opacity-50 z-40' onClick={() => setListOpen(false)}>
          <div className='w-64 h-full bg-white p-4 shadow-lg fixed left-0 top-0 flex flex-col gap-4 z-50'>
            <X size={24} className='cursor-pointer self-end' onClick={() => setListOpen(false)} />
            <div className='flex flex-col gap-4'>
              <div className={`flex items-center gap-1 cursor-pointer text-sm duration-300  ${location.pathname==="/dashboard"?"text-sky-500":"text-black hover:text-sky-700"}`} onClick={()=>{navigate("/dashboard")}}><LayoutDashboard size={20}/><p>Dashboard</p></div>
              <div className={`flex items-center gap-1 cursor-pointer text-sm duration-300  ${location.pathname==="/digests"?"text-sky-500":"text-black hover:text-sky-700"}`} onClick={()=>{navigate("/digests")}}><LayoutList size={20} /><p>Digests</p></div>
              <div className={`flex items-center gap-1 cursor-pointer text-sm duration-300  ${location.pathname==="/explore-projects"?"text-sky-500":"text-black hover:text-sky-700"}`} onClick={()=>{navigate("/explore-projects")}}><SquareMousePointer size={20} /><p>Explore</p></div>
              <div className={`flex items-center gap-1 cursor-pointer text-sm duration-300  ${location.pathname==="/projects"?"text-sky-500":"text-black hover:text-sky-700"}`} onClick={()=>{navigate("/projects")}}><SquareKanban size={20} /><p>Projects</p></div>
            </div>
          </div>
        </div>
      )}

      {isNotificationOpen && (
        <div className='fixed inset-0 bg-opacity-50 z-40 ' onClick={() => setNotificationOpen(false)}>
          <div className='w-[25%] min-w-[350px] h-full bg-white p-4 shadow-lg fixed right-0 top-0 flex flex-col gap-4 z-50'>
            <X size={24} className='cursor-pointer self-end' onClick={() => setNotificationOpen(false)} />
            <h2 className='text-lg font-semibold'>Notifications</h2>
            <div className='text-sm text-gray-500'>No new notifications</div>
          </div>
        </div>
      )}

      {isProfileOpen && (
        <div className='fixed inset-0 bg-opacity-50 z-40 ' onClick={() => setProfileOpen(false)}>
          <div className='min-w-[350px] w-[25%] h-full bg-white p-4 shadow-lg fixed right-0 top-0 flex flex-col gap-4 z-50'>
            <X size={24} className='cursor-pointer self-end' onClick={() => setProfileOpen(false)} />
            <h2 className='text-lg font-semibold'>Profile</h2>
            <div className='text-sm text-gray-500'>Your Profile </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
