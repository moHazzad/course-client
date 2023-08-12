// import React from 'react'

// import { useContext } from "react";
// import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "react-modal";
import RecentlyPayments from "./RecentlyPayments";

function ManageClasses() {
  // const { user } = useContext(AuthContext);
  // const [alertMessage, setAlertMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  const handleApprove = async (classId) => {
    try {
      await axiosSecure.post(`/classes/${classId}/approve`);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "class  added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch(); // Refresh the data after successful update
    } catch (error) {
      console.error(error);
    }
  };


  const handleDeny = (classId) => {
    setSelectedClassId(classId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFeedback("");
    setSelectedClassId(null);
  };

  const handleFeedbackSubmit = async () => {
    try {
      await axiosSecure.post(`/classes/${selectedClassId}/deny`, { feedback });
      //   setAlertMessage("Class item denied successfully.");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "class  denied ",
        showConfirmButton: false,
        timer: 1500,
      });
      setFeedback("");
      setIsModalOpen(false);
      setSelectedClassId(null);
      refetch();
    } catch (error) {
      console.error(error);
      //   setAlertMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
    <div className="py-10">
      <h1 className="text-2xl font-bold ">Recently Payments</h1>
      <div className="grid grid-cols-2 gap-3">
      <RecentlyPayments />
      </div>
    </div>
      {classes ? (
        <>
        <h2 className="text-2xl font-bold py-10 text-start">Classes Status</h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Image</th>
                <th>Name</th>
                <th>Instructor</th>
                <th>Total Seats</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {classes?.map((classItem, index) => (
                <tr key={classItem._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={classItem.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold">{classItem.name}</div>
                    </div>
                  </td>
                  <td>{classItem.instructor}</td>
                  <td>{classItem.seats}</td>
                  {/* <td>{classItem.status}</td> */}
                  <td>{classItem.status === 'pending'? <div className="badge badge-warning gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
  pending
</div> :<> {classItem.status === 'approved' ? <><div className="badge badge-success gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
  Approved
</div></>: <><div className="badge badge-error gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
  denied 
</div></>}</>}</td>
                  <th>
                    {
                      classItem.status === 'pending' ?<><button
                      className="badge badge-success btn-xs "
                      onClick={() => handleApprove(classItem._id)}
                    >
                      Approve
                    </button>

                    <button
                      className="badge badge-error btn-xs"
                      onClick={() => handleDeny(classItem._id)}
                    >
                      Deny
                    </button></>: 'Action Taken'
                    }
                    
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      ) : (
        <h1>dont</h1>
      )}
      <Modal 
      className={''}
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Feedback Modal"
      >
        <h2>Deny Class Item</h2>
        {/* <label>Feedback:</label> */}
        <textarea
        className="bg-slate-300 px-2 py-5"
        placeholder="Please write a feedback hare"
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <div>
        <button onClick={handleFeedbackSubmit} className="badge badge-success btn-xs">Submit Feedback</button>
        <button onClick={handleModalClose} className="badge badge-error btn-xs">Cancel</button>
        </div>
      </Modal>
    </>
  );
}

export default ManageClasses;
