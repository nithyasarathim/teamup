import React from 'react';
import StockImg from '../../assets/stockimg.jpg'; 
import { CircleArrowUpIcon, CircleArrowDownIcon } from 'lucide-react';

const DigestDetails = ({ digestUser, digestName, digestTag, Upvotes, digestContent, timestamp }) => {
  return (
    <div className='shadow-sm m-2 h-fit bg-white col-span-5 grids grid-cols-1 flex items-center'>
      <div className='img w-[40%] h-[40%] m-3 flex items-center justify-center'>
        <img src={StockImg} alt='digest' className='w-full h-auto rounded-md' />
      </div>

      <div className='post-desc m-1 flex flex-col shadow-md w-[60%] justify-center h-full'>
        <div className='user-data border-b border-gray-200 flex items-center justify-between mx-5 mt-5'>
          <div className='p-1 bg-white'>
            <span className='font-bold text-sm'>{digestUser}</span>
          </div>
          <div className='bg-sky-100 h-fit p-1 rounded-lg'>
            <p className='text-xs'>{digestTag}</p>
          </div>
        </div>
        <div className='font-md wrap p-3 flex items-center justify-center'>
          <p>{digestContent}</p>
        </div>
        <div className='justify-between flex items-center'>
          <p className='mx-3 font-light text-xs'>{timestamp}</p>
          <p className='mx-3 font-bold text-xs'>{Upvotes} reputation</p>
          <div className='user-data flex items-center gap-3 m-3 justify-end mx-5 mt-5'>
            <div className='bg-green-500 h-fit p-1 rounded-lg flex items-center justify-center'>
              <div className='upvote flex items-center p-1 gap-3'>
                <CircleArrowUpIcon className='h-5 w-5 text-white'/>
              </div>
            </div>
            <div className='bg-red-500 h-fit p-1 rounded-lg flex items-center justify-center'>
              <div className='Downvote flex items-center p-1 gap-3'>
                <CircleArrowDownIcon className='h-5 w-5 text-white'/>
              </div>
            </div>
          </div> 
        </div> 
      </div>
    </div>
  );
};

export default DigestDetails;
