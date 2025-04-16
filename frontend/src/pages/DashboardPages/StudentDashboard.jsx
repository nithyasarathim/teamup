import React, { useState } from 'react';
import Header from '../../components/Header';
import StatisticsColumn from '../../components/DashboardComponents/StatisticsColumn';
import PendingIssues from '../../components/DashboardComponents/PendingIssues';
import LatestDigest from '../../components/DashboardComponents/LatestDigests';
import MailModal from '../../components/ModalComponents/MailModal';
import AddMailModal from '../../components/ModalComponents/AddMailModal';

const UserDashboard = () => {
  const [showMail, setShowMail] = useState(false); 
  const [showAddMail, setShowAddMail] = useState(false);

  return (
    <div className='userdashboard w-full bg-white relative'>
      <Header />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 p-4'>
        <StatisticsColumn className='col-span-3' setShowMail={setShowMail} showMail={showMail} setShowAddMail={setShowAddMail}/>
        <PendingIssues className='col-span-2' />
        <LatestDigest className='col-span-2' />
      </div>
        {showMail && <MailModal onClose={() => setShowMail(false)} />}
        {showAddMail && <AddMailModal setShowAddMail={setShowAddMail}/>}
    </div>
  );
};

export default UserDashboard;
