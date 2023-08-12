// import React from 'react'

// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/UseAxiosSecure";
// import { useContext } from "react";
// import { AuthContext } from "../../../AuthProvider/AuthProvider";
// import { FaCartPlus, FaUserAlt } from "react-icons/fa";
// import useUsers from "../../Hooks/useUsers";
// import Swal from "sweetalert2";
// import axios from "axios";
import { useState } from "react";
import { FaUserAlt, FaViadeo, FaVideo } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
// import { motion } from "framer-motion"

function PopulerClassForHome() {
    const [paymentData, setPaymentData] = useState([])
//   const [users] = useUsers();
//   const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
//   const { data: approvedClasses = [] } = useQuery(
//     ["approved"],
//     async () => {
//       const res = await axios.get("/approvedClasses");
//       return res.data;
//     }
//   );
axiosSecure.get('/popularClass')
.then(res => setPaymentData(res.data))

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 ">
      {paymentData.slice(0, 8).map((singleClass) => (
        <div
          key={singleClass._id}
          className="card w-full bg-base-100 shadow-sm"
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
          <div className="card-body p-4">
            <h2 className="card-title">{singleClass.name}</h2>
            {/* <p>{singleClass.name}</p> */}
            <div className="flex justify-end text-sm">
              <p className="flex gap-2 items-center">
                {" "}
                <FaUserAlt className="text-[#1BBF72]" />{" "}
                {singleClass.totalStudents} students
              </p>
              <p className="text-end"> Seats left: {singleClass.seats}</p>
            </div>
            <div className="divider my-1"></div>
            <div className=" flex text-slate-400 text-sm">
              <p>{singleClass.instructor}</p>
              <div>
              <p className="text-right flex  justify-between items-center gap-2"> <FaVideo /> {"(10hr 35m)"} </p>
              </div>
              {/* <div className="badge badge-outline">Fashion</div> */}
              {/* {
                findUser?.role === 'admin' || findUser?.role === 'instructor' ?<button className="btn" disabled="disabled">Select Class</button>:<button
                className="btn btn-ghost"
                onClick={() => {
                  handleSelectClass(singleClass);
                }}
              >
                <FaCartPlus /> Select class
              </button>
              } */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PopulerClassForHome;
