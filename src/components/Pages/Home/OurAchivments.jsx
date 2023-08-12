// import React from 'react';

import manImage from '../../../../src/assets/achievements-img.png' 
import image from '../../../../src/assets/counter-shape.png' 

function OurAchivments() {
 

  return (
    <div className=''>
      <div className='flex  md:h-48 my-4'>
      <div className='  flex  gap-6 bg-[#1BBF72] px-3 py-2 md:w-[50%] rounded-md'>
        <img className='hidden md:block ' src={manImage} alt="" />
        <div className=' flex flex-col justify-center '>
        <h2 className='md:text-3xl text-xl font-bold'>Our Achievements</h2>
        <p className='my-2'>
          Learn the secrets of life success, all the successes we have achieved
          in achieving goals.
        </p>
        </div>
      </div>
      <div className='w-[50%] hidden md:block'>
        <img src={image} alt="" />
      </div>
      </div>
      <div  className='grid grid-cols-2 md:grid-cols-4 justify-center items-center text-center'>
        <div>
          <p className='md:text-4xl text-2xl font-bold text-[#1BBF72] mb-2'>5000+</p>
          <p className='md:text-xl text-md font-semibold text-gray-300'>Students Enrolled</p>
        </div>
        <div>
          <p className='md:text-4xl text-2xl font-bold text-[#1BBF72] mb-2'>3000+</p>
          <p className='md:text-xl text-md font-semibold text-gray-300'>Courses & Videos</p>
        </div>
        <div>
          <p className='md:text-4xl text-2xl font-bold text-[#1BBF72] mb-2'>20+</p>
          <p className='md:text-xl text-md font-semibold text-gray-300'>Courses Instructors</p>
        </div>
        <div>
          <p className='md:text-4xl text-2xl font-bold text-[#1BBF72] mb-2'>96%</p>
          <p className='md:text-xl text-md font-semibold text-gray-300'>Satisfaction Rate</p>
        </div>
      </div>
    </div>
  );
}

export default OurAchivments;
