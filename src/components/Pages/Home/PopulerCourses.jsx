// import React from 'react'

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { FaCartPlus, FaUserAlt } from "react-icons/fa";
import useUsers from "../../Hooks/useUsers";
import Swal from "sweetalert2";
// import { motion } from "framer-motion"

function PopulerCourses() {
  const [users] = useUsers();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: approvedClasses = [], refetch } = useQuery(
    ["approved"],
    async () => {
      const res = await axiosSecure.get("/approvedClasses");
      return res.data;
    }
  );

  
  
  const findUser = users?.find(us => us?.email === user?.email )


  const handleSelectClass = async (classItem) => {
    console.log(classItem);

    const {
      _id,
      name,
      price,
      seats,
      email,
      instructor,
      image,
      status,
      totalStudents,
    } = classItem;
    

    try {
      const selectedClass = {
        classId: _id,
        name,
        price,
        seats,
        email,
        instructor,
        image,
        status,
        totalStudents,
        selectedBy: user?.email

        // Assuming the user's email is available in the AuthContext
      };
      await axiosSecure.post("/selectedClasses", selectedClass);
      // alert("Class selected successfully!");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "class  added to cart",
        showConfirmButton: false,
        timer: 1500,
      });

      // Refetch the approved classes to update the UI
      refetch();
    } catch (error) {
      console.error(error);
      alert("this Class Already selected");
    }
  };

  //   const isClassSelectedByUser = (classItem) => {
  //     return approvedClasses.some((selectedClass) => {
  //       return (
  //         selectedClass._id === classItem._id && selectedClass.selectedBy === user?.email
  //       );
  //     });
  //   };

  // console.log(approvedClasses[0].seats - approvedClasses[0].totalStudents);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      {approvedClasses.slice(0, 6).map((singleClass) => (
        <div
          key={singleClass._id}
          className="card w-full bg-base-100 shadow-xl"
        >
          <figure>
            <img
              src={singleClass.image}
              className="relative overflow-hidden w-full h-48"
              alt="Shoes"
            />
          </figure>
          <div className="px-4 py-2 rounded-sm text-white font-bold bg-[#1BBF72] absolute right-0 ">
            ${singleClass.price}{" "}
          </div>
          <div className="card-body">
            <h2 className="card-title">{singleClass.name}</h2>
            {/* <p>{singleClass.name}</p> */}
            <div className="flex justify-end">
              <p className="flex gap-2 items-center">
                {" "}
                <FaUserAlt className="text-[#1BBF72]" />{" "}
                {singleClass.totalStudents} students
              </p>
              <p className="text-end"> Seats left: {singleClass.seats}</p>
            </div>
            <div className="divider my-1"></div>
            <div className="card-actions justify-end">
              <p>by:{singleClass.instructor}</p>
              {/* <div className="badge badge-outline">Fashion</div> */}
              {
                findUser?.role === 'admin' || findUser?.role === 'instructor' ?<button className="btn" disabled="disabled">Select Class</button>:<button
                className="btn btn-ghost"
                onClick={() => {
                  handleSelectClass(singleClass);
                }}
              >
                <FaCartPlus /> Select class
              </button>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PopulerCourses;
