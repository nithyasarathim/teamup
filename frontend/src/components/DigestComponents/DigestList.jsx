import React from 'react';
import TestImg from '../../assets/stockimg.jpg';
import { useNavigate } from 'react-router-dom';

const DigestList = ({ digests, setSelectedDigest, filterCategory, setFilterCategory }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDigestClick = (digest) => {
    setSelectedDigest(digest);
    navigate(`/digests/${digest._id}`);
  };

  return (
    <div className='col-span-2 h-full flex'>
      <div className='h-[520px] w-full bg-white shadow-sm rounded-lg p-2'>
        <div className='mb-4 px-3 flex items-center justify-between border-b pb-2'>
          <h2 className='text-lg font-semibold text-sky-600'>Digests</h2>
          <select
            className="filter w-40 text-black font-light text-sm p-1 border border-gray-300 rounded"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Paper Presentation">Paper Presentation</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className='digest-list overflow-y-auto h-[85%] pr-1'>
          {digests.length > 0 ? (
            digests.map((digest) => (
              <div
                key={digest._id}
                className='p-2 mb-2 bg-white rounded-md shadow-sm hover:bg-sky-50 cursor-pointer flex gap-3'
                onClick={() => handleDigestClick(digest)}
              >
                <img
                  src={`http://localhost:8000/${digest.image}` || TestImg}
                  alt='digest'
                  className='w-14 h-14 rounded-md object-cover'
                />
                <div className='w-full'>
                  <h3 className='text-sm font-semibold mb-1'>{digest.title}</h3>
                  <div className='flex justify-between text-xs text-gray-600'>
                    <p className='bg-sky-100 px-2 py-0.5 rounded'>{digest.category}</p>
                    <p className='text-gray-400'>{formatDate(digest.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-gray-500 mt-10'>No digests available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigestList;