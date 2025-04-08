import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import StatisticsColumn from '../../components/DashboardComponents/StatisticsColumn';
import PendingIssues from '../../components/DashboardComponents/PendingIssues';
import LatestDigest from '../../components/DashboardComponents/LatestDigests';

const UserDashboard = () => {
  
  return (
    <div className='userdashboard w-full bg-white'>
      <Header />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 p-4'>
        <StatisticsColumn className='col-span-3' />
        <PendingIssues className='col-span-2' />
        <LatestDigest className='col-span-2'/>
      </div>
    </div>
  );
};

export default UserDashboard;
