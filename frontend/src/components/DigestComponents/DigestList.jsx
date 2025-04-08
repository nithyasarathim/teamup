import React from 'react';
import TestImg from '../../assets//stockimg.jpg'; 

const DigestList = ({ digests, setSelectedDigest }) => {
  return (
    <div className='col-span-2 h-[100%] items-center flex'>
        <div className=' h-[80%] bg-white shadow-sm m-2'>
      <div className='m-3 text-lg font-semibold justify-between flex text-sky-600 border-b'>
        Digests
        <select className="filter ml-2 w-40 text-black font-light text-sm">
          <option value="all">All</option>
          <option value="machinelearning">Machine Learning</option>
          <option value="datascience">Data Science</option>
          <option value="IoT">IoT</option>
          <option value="cloudcomputing">Cloud Computing</option>
          <option value="blockchain">Blockchain</option>
          <option value="cybersecurity">Cyber Security</option>
          <option value="webdevelopment">Web Development</option>
          <option value="mobiledevelopment">Mobile Development</option>
          <option value="devops">DevOps</option>
          <option value="agile">Agile</option>
          <option value="projectmanagement">Project Management</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className='digest-list mt-5 overflow-y-auto h-[85%]'>
        {digests.map((digest) => (
          <div 
            key={digest.id} 
            className='bg-white p-2 m-2 rounded-md shadow-sm flex duration-300 hover:bg-sky-50 hover:shadow-md cursor-pointer' 
            onClick={() => setSelectedDigest(digest)}
          >
            <div className='img-container w-1/4'>
              <img src={TestImg} alt='Default' className='w-full h-auto justify-center align-center rounded-md' />
            </div>
            <div className='content-container w-3/4 p-1 ml-2'>
              <h3 className='text-sm font-bold mb-1 min-h-[40px]'>{digest.title}</h3>
              <div className='flex justify-between gap-1'>
                <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>{digest.category}</p>
                <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>{digest.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default DigestList;
