import React from 'react'
import TestImg from '../../assets/logo.png'
import { PlusIcon } from 'lucide-react'


const LatestDigest = () => {
  return (
    <div className='grid-col-2 col-span-2 mx-2 justify-center gap-3'>
        <div className="announcement col-span-2 bg-white p-3 rounded-md shadow-md h-[40vh] md:h-[80vh]">
            <div className='flex justify-between p-1 items-center'>
                <h2 className='latestAnnouncement border-b text-left text-lg text-sky-600 font-bold'>Recent Digests</h2>
            </div>

            <div className='announcement-list overflow-y-auto h-[90%] '>

                <div className='bg-white  p-2  m-2 rounded-md shadow-sm flex duration-300 hover:bg-sky-50 hover:shadow-md' onClick={()=>{setAnnouncementModal(true)}}>
                    <div className='img-container w-1/4 '>
                        <img src={TestImg}  alt='noimg' className='w-full h-auto justify-center align-center rounded-md'/>
                    </div>
                    <div className='content-container w-3/4 p-1 ml-2'>
                        <h3 className='text-sm font-bold mb-1 min-h-[40px]'>Internship for higher grade students across the university of the world...</h3>
                        <div className='flex justify-between gap-1'>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>Mobile App development</p>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>30 mins ago</p>
                        </div>
                    </div>
                </div>   

                <div className='bg-white  p-2  m-2 rounded-md shadow-sm flex duration-300 hover:bg-sky-50 hover:shadow-md' onClick={()=>{setAnnouncementModal(true)}}>
                    <div className='img-container w-1/4 '>
                        <img src={TestImg}  alt='noimg' className='w-full h-auto justify-center align-center rounded-md'/>
                    </div>
                    <div className='content-container w-3/4 p-1 ml-2'>
                        <h3 className='text-sm font-bold mb-1 min-h-[40px]'>Internship for higher grade students across the university of the world...</h3>
                        <div className='flex justify-between gap-1'>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>Mobile App development</p>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>30 mins ago</p>
                        </div>
                    </div>
                </div>   

                <div className='bg-white  p-2  m-2 rounded-md shadow-sm flex duration-300 hover:bg-sky-50 hover:shadow-md' onClick={()=>{setAnnouncementModal(true)}}>
                    <div className='img-container w-1/4 '>
                        <img src={TestImg}  alt='noimg' className='w-full h-auto justify-center align-center rounded-md'/>
                    </div>
                    <div className='content-container w-3/4 p-1 ml-2'>
                        <h3 className='text-sm font-bold mb-1 min-h-[40px]'>Internship for higher grade students across the university of the world...</h3>
                        <div className='flex justify-between gap-1'>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>Mobile App development</p>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>30 mins ago</p>
                        </div>
                    </div>
                </div>  

                <div className='bg-white  p-2  m-2 rounded-md shadow-sm flex duration-300 hover:bg-sky-50 hover:shadow-md' onClick={()=>{setAnnouncementModal(true)}}>
                    <div className='img-container w-1/4 '>
                        <img src={TestImg}  alt='noimg' className='w-full h-auto justify-center align-center rounded-md'/>
                    </div>
                    <div className='content-container w-3/4 p-1 ml-2'>
                        <h3 className='text-sm font-bold mb-1 min-h-[40px]'>Internship for higher grade students across the university of the world...</h3>
                        <div className='flex justify-between gap-1'>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>Mobile App development</p>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>30 mins ago</p>
                        </div>
                    </div>
                </div> 

                <div className='bg-white  p-2  m-2 rounded-md shadow-sm flex duration-300 hover:bg-sky-50 hover:shadow-md' onClick={()=>{setAnnouncementModal(true)}}>
                    <div className='img-container w-1/4 '>
                        <img src={TestImg}  alt='noimg' className='w-full h-auto justify-center align-center rounded-md'/>
                    </div>
                    <div className='content-container w-3/4 p-1 ml-2'>
                        <h3 className='text-sm font-bold mb-1 min-h-[40px]'>Internship for higher grade students across the university of the world...</h3>
                        <div className='flex justify-between gap-1'>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>Mobile App development</p>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>30 mins ago</p>
                        </div>
                    </div>
                </div>  

                <div className='bg-white  p-2  m-2 rounded-md shadow-sm flex duration-300 hover:bg-sky-50 hover:shadow-md' onClick={()=>{setAnnouncementModal(true)}}>
                    <div className='img-container w-1/4 '>
                        <img src={TestImg}  alt='noimg' className='w-full h-auto justify-center align-center rounded-md'/>
                    </div>
                    <div className='content-container w-3/4 p-1 ml-2'>
                        <h3 className='text-sm font-bold mb-1 min-h-[40px]'>Internship for higher grade students across the university of the world...</h3>
                        <div className='flex justify-between gap-1'>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>Mobile App development</p>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>30 mins ago</p>
                        </div>
                    </div>
                </div> 

                <div className='bg-white  p-2  m-2 rounded-md shadow-sm flex duration-300 hover:bg-sky-50 hover:shadow-md' onClick={()=>{setAnnouncementModal(true)}}>
                    <div className='img-container w-1/4 '>
                        <img src={TestImg}  alt='noimg' className='w-full h-auto justify-center align-center rounded-md'/>
                    </div>
                    <div className='content-container w-3/4 p-1 ml-2'>
                        <h3 className='text-sm font-bold mb-1 min-h-[40px]'>Internship for higher grade students across the university of the world...</h3>
                        <div className='flex justify-between gap-1'>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>Mobile App development</p>
                            <p className='text-xs text-black px-2 my-1 mx-auto rounded-md py-1 bg-sky-50'>30 mins ago</p>
                        </div>
                    </div>
                </div>   
                        
            </div>  
        </div>
    </div>
  )
}

export default LatestDigest