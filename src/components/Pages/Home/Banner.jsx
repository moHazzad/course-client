// import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from '../../../assets/banner-img.png'
// import { SparkScroll, SparkProxy, sparkScrollFactory } from 'react-spark-scroll-gsap';



function Banner() {
  return (
    <div>
    <div className="lg:h-[550px] md:s-screen relative overflow-hidden bg-gradient-to-r from-pink-100 to-pink-200 px-[10%]">
      <div className="flex flex-col justify-center items-center md:flex-row md:justify-between">
        <img
          src={bannerImg}
          className="w-[50%] absolute bottom-0 right-0 hidden md:block"
        />

        <div className="w-[100%] md:w-[50%]  h-[500px] flex flex-col justify-center  md:text-start">
          
          <h3 className="uppercase font-bold">For Better future</h3>
          <h1 className="lg:text-7xl md:text-5xl text-4xl font-bold">Upgrade your </h1>
          <h1 className="lg:text-7xl md:text-5xl text-4xl font-bold py-5">
            <span className="text-[#1BBF72]">Skill</span> with us
          </h1>
          
          {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
          <div><Link to={'/class'} className="btn bg-[#1BBF72]">Courses</Link></div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Banner