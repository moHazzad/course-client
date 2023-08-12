// import React from 'react'
import img from '../../../assets/community-shape-1.png'

function JoinCommunity() {
  return (
    <div className='flex gap-6 py-5'>

        <div>
            <img className='hidden md:block' src={img} alt="" />
        </div>
        <div className='w-60%'>
        <div  >
        <h1 className='font-bold text-3xl'>Join Our Community</h1>
        <p className='py-5 md:px-20 text-slate-500'>Proin eget tortor risus. Curabitur aliquet quam id dui posuere blandit. Nulla quis lorem ut libero malesuada feugiat. Proin eget tortor risus.</p>
    </div>
    <div className='flex justify-center '>
        <input type="email" placeholder='Enter Your Email' className='md:w-96 w-40 sm:w-72 bg-slate-100 p-3 px-4'  />
        <button className='py-3 px-4 bg-[#1BBF72] font-semibold text-slate-100'>Subscribe</button>
    </div>
    </div>
    </div>
  )
}

export default JoinCommunity