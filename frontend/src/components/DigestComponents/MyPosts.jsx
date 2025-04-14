import React from 'react';
import { Ban,FileText } from 'lucide-react';

const MyPosts = ({ posts = [] }) => {
  return (
    <div className='bg-gray-100 rounded-2xl p-4 shadow-md h-full'>
      
      <div className='flex items-center gap-2 border-b pb-2 mb-4'>
        <FileText className='text-blue-600' />
        <h2 className='text-blue-600 font-bold text-lg'>MY POSTS</h2>
      </div>

  
      {posts.length === 0 ? (
        <div className='bg-white rounded-xl p-6 flex flex-col items-center justify-center h-64 text-center shadow'>
          <Ban className='h-10 w-10 text-gray-400 mb-2' />
          <p className='text-lg font-semibold text-gray-700'>NO POSTS</p>
          <p className='text-sm text-gray-500'>Nothing here yet — start posting!

</p>
        </div>
      ) : (
        <div>
     
          {posts.map((post, idx) => (
            <div key={idx} className='mb-4 p-3 bg-white rounded-xl shadow'>
              <h3 className='font-medium text-gray-800'>{post.title}</h3>
              <p className='text-sm text-gray-600'>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;