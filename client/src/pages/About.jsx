import React from 'react'

const About = () => {
  return (
    <div className='min-h-[90vh] flex items-center justify-center'>
   
      <div className="w-[400px] mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-blue-900 dark:bg-slate-800  ">
  <div className="relative">
    <img className="w-full h-80 object-cover p-4" src="https://i.ibb.co/zGDTfp5/Whats-App-Image-2024-09-14-at-23-46-17-12b40096.jpg" alt="Profile Image"/>
  </div>
  <div className=" flex flex-col items-center px-6 py-4">
    <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 " >Rohit Raghuwanshi</div>
    <p className="text-gray-600 dark:text-gray-100">Front-end Developer</p>
  </div>
  <div className=" flex flex-row justify-center gap-2 px-6 py-4 items-center">
    <span className="px-2 py-1 font-semibold text-teal-900 bg-teal-200 rounded-full">MERN</span>
    <span className="px-2 py-1 font-semibold text-indigo-900 bg-indigo-200 rounded-full">Firebase</span>
    <span className=" px-2 py-1 font-semibold text-purple-900 bg-purple-200 rounded-full">Tailwind</span>
  </div>
  <div className="px-6 py-4">
    <a href="https://my-portfolio-roan-nine.vercel.app/" className="text-blue-500 hover:underline">View Profile</a>
  </div>
</div>
    </div>
  );
}

export default About