import React from 'react';
import { FileImage, FileText, FileVideo, GalleryVertical } from 'lucide-react';

const FileStacks = () => {
  const files = [
    { id: 1, name: 'Image.jpg', type: 'image', icon: <FileImage size={24} /> },
    { id: 2, name: 'Document.pdf', type: 'pdf', icon: <FileText size={24} /> },
    { id: 3, name: 'Presentation.ppt', type: 'ppt', icon: <GalleryVertical size={24} /> }
  ];

  return (
    <div className='col-span-2 mx-3 p-4 bg-white rounded-xl shadow-md'>
      <h3 className='text-lg font-semibold mb-4'>File Stack</h3>
      <ul className='space-y-3'>
        {files.map(file => (
          <li key={file.id} className='flex items-center space-x-3'>
            <div className='p-2 bg-gray-100 rounded-full'>
              {file.icon}
            </div>
            <div>
              <p className='font-medium text-gray-700'>{file.name}</p>
              <span className='text-sm text-gray-500'>{file.type.toUpperCase()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileStacks;
