import React from 'react';
import { FileImage, FileText, GalleryVertical, Download, Plus } from 'lucide-react';

const FileStacks = () => {
  const files = [
    { 
      id: 1, 
      name: 'Image.jpg', 
      type: 'image', 
      icon: <FileImage size={24} />, 
      link: '#', 
      uploader: 'Alice',
      uploadedAt: new Date('2025-04-10T14:30:00') 
    },
    { 
      id: 2, 
      name: 'Document.pdf', 
      type: 'pdf', 
      icon: <FileText size={24} />, 
      link: '#', 
      uploader: 'Bob',
      uploadedAt: new Date('2025-04-15T09:45:00') 
    },
    { 
      id: 3, 
      name: 'Presentation.ppt', 
      type: 'ppt', 
      icon: <GalleryVertical size={24} />, 
      link: '#', 
      uploader: 'Charlie',
      uploadedAt: new Date('2025-04-17T11:00:00') 
    }
  ];

  const handleDownload = (link) => {
    console.log(`Downloading from ${link}`);
    // Logic for downloading the file
  };

  const handleAddFile = () => {
    console.log('Add file logic goes here');
    // Logic for adding a new file
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className='col-span-2 mx-3 p-4 bg-white rounded-xl shadow-md'>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-semibold border-b'>File Stack</h3>
        <button
          onClick={handleAddFile}
          className='p-2  bg-sky-500 text-white rounded-full hover:bg-green-600'
        >
          <Plus size={20} />
        </button>
      </div>
      <ul className='space-y-3'>
        {files.map(file => (
          <li key={file.id} className='flex items-center space-x-3 shadow-lg p-3 rounded-xl'>
            <div className='p-2 bg-gray-100 rounded-full'>
              {file.icon}
            </div>
            <div className='flex-1'>
              <div className='flex items-center justify-between'>
                <p className='font-medium text-gray-700'>{file.name}</p>
                <span className='text-sm text-gray-500'>{file.type.toUpperCase()}</span>
              </div>
              <span className='text-xs text-gray-400'>Uploaded by {file.uploader}</span>
              <div className='text-xs text-gray-400'>
                <span>Uploaded on: {formatDate(file.uploadedAt)}</span>
              </div>
            </div>
            <button
              onClick={() => handleDownload(file.link)}
              className='flex items-center justify-center p-2 bg-sky-100 text-black rounded-full hover:bg-sky-600'
            >
              <Download size={20} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileStacks;
