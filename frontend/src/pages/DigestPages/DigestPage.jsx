import React, { useState } from 'react';
import Header from '../../components/Header';
import DigestList from '../../components/DigestComponents/DigestList';
import DigestDetails from '../../components/DigestComponents/DigestDetails';
import digestsData from './digests.json';

const DigestPage = () => {
  const [selectedDigest, setSelectedDigest] = useState(null);

  return (
    <div>
      <Header />
      <div className='min-w-[320px] mt-2 grid grid-cols-7 w-[95%] h-fit mx-auto bg-neutral-50 rounded-lg shadow-sm items-center justify-center'>
        <div className='col-span-2 flex items-center justify-center h-full'>
          <DigestList
            digests={digestsData} 
            setSelectedDigest={setSelectedDigest} 
          />
        </div>
        <div className='col-span-5 flex items-center justify-center h-full'>
          <DigestDetails 
            digestUser={selectedDigest?.user || "Select a digest"}
            digestName={selectedDigest?.title || ""}
            digestTag={selectedDigest?.category || ""}
            Upvotes={selectedDigest?.upvotes || 0}
            digestContent={selectedDigest?.content || "Click a digest to view details."}
          />
        </div>
      </div>
    </div>
  );
};

export default DigestPage;
