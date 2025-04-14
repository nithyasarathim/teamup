import React, { useState } from 'react';
import Header from '../../components/Header';
import DigestList from '../../components/DigestComponents/DigestList';
import DigestDetails from '../../components/DigestComponents/DigestDetails';
import digestsData from './digests.json';

const DigestPage = () => {
  const [selectedDigest, setSelectedDigest] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredDigests = filterCategory === 'all'
    ? digestsData
    : digestsData.filter(d => d.category.toLowerCase() === filterCategory.toLowerCase());

  return (
    <div>
      <Header />
      <div className='min-w-[320px] mt-4 grid grid-cols-7 w-[95%] h-fit mx-auto bg-gray-50 rounded-lg shadow-md'>
        
        <div className='col-span-2 flex items-start justify-center p-3'>
          <DigestList 
            digests={filteredDigests}
            setSelectedDigest={setSelectedDigest}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        </div>

        <div className='col-span-5 flex items-start justify-center p-3'>
          <DigestDetails 
            digestUser={selectedDigest?.user || "Select a digest"}
            digestName={selectedDigest?.title || ""}
            digestTag={selectedDigest?.category || ""}
            digestContent={selectedDigest?.content || "Click a digest to view details."}
            timestamp={selectedDigest?.timestamp || ""}
          />
        </div>

      </div>
    </div>
  );
};

export default DigestPage;