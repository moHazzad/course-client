// import React from 'react'
import { Link } from "react-router-dom";
import Banner from "./Banner";
import LearningSection from "./LearningSection";
// import PopulerCourses from "./PopulerCourses";
import OurInstructors from "./OurInstructors";
import OurAchivments from "./OurAchivments";
import img from "../../../assets/humaaan-6.png";
import JoinCommunity from "./JoinCommunity";
import PopulerClassForHome from "./PopulerClassForHome";
import Testimonial from "./Testimonial";
// import OurAchivments from "./OurAchivments";
// import OurAchivments from "./OurAchivments";

function Home() {
  return (
    <>
      <Banner />
      <div className="my-10 w-[90%] mx-auto">
        <LearningSection />
      </div>
      <div className="my-10 lg:w-[90%] w-[85%] mx-auto ">
        <div className="flex justify-between items-center">
          <h1 className="md:text-5xl text-2xl font-bold my-10">Popular Courses</h1>
          <Link
            to={"/classes"}
            className="text-md  my-10 text-[#1BBF72] "
          >
            See All Classes
          </Link>
        </div>
        {/* <PopulerCourses /> */}
        <PopulerClassForHome />
      </div>
      <div className="text-center text-slate-400 py-4 w-[85%] mx-auto">
        <p>
          Enjoy top learning methods and master the next level! You are the
          creator of your
        </p>
        <p>
          own career and we will guide you through it.
          <Link to={"/signup"} className="text-[#1BBF72]">
            {" "}
            Register Free Now!
          </Link>{" "}
        </p>
      </div>
      <div className="w-[90%] mx-auto my-20">
        <OurInstructors />
      </div>
      <section className="w-[90%] mx-auto ">
        <div className="my-10">
          <OurAchivments />
        </div>
      </section>
      <Testimonial />
      <section className="my-20 w-[90%] mx-auto">
        <div className="py-5 px-2 flex flex-col md:flex-row justify-center items-center gap-5 bg-[#1BBF72]">
          <div className="md:w-[50%]">
            {" "}
            <h2 className="md:text-2xl text-md font-bold text-slate-100">
              Learn At Your Own Pace, With Lifetime Access Anywhere And Any
              Device
            </h2>
          </div>
          <div className="flex items-center">
            <button className="md:text-lg text-sm md:font-semibold bg-white py-2 px-4">Get Started</button>
            <img className="hidden md:block" src={img} alt="" />
          </div>
        </div>
      </section>
      <div className="w-[90%] mx-auto flex justify-center text-center my-20">
        <JoinCommunity />
      </div>
    </>
  );
}

export default Home;
