import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import DigestList from '../../components/DigestComponents/DigestList';
import DigestDetails from '../../components/DigestComponents/DigestDetails';

const DigestPage = () => {
  const [digests, setDigests] = useState([]);
  const [selectedDigest, setSelectedDigest] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const { id } = useParams();

  // Fetch all digests
  useEffect(() => {
    fetch('http://localhost:8000/post/get')
      .then(res => res.json())
      .then(data => setDigests(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch specific digest when ID changes
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/post/get/${id}`)
        .then(res => res.json())
        .then(data => setSelectedDigest(data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const filteredDigests = filterCategory === 'all'
    ? digests
    : digests.filter(d => d.category.toLowerCase() === filterCategory.toLowerCase());

  return (
    <div>
      <Header />
      <div className='min-w-[320px] mt-4 grid grid-cols-7 w-[95%] h-fit mx-auto bg-gray-50 rounded-lg shadow-md'>
        <div className='col-span-2 w-full flex items-start justify-center p-3'>
          <DigestList 
            digests={filteredDigests}
            setSelectedDigest={setSelectedDigest}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
        </div>

        <div className='col-span-5 flex items-start justify-center p-3'>
          <DigestDetails 
            digest={selectedDigest}
          />
        </div>
      </div>
    </div>
  );
};

export default DigestPage;