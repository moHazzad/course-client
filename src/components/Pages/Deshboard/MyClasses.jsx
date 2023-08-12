// import React from 'react'

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

function MyClasses() {
  const { user } = useContext(AuthContext);

  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get(`/classes/${user.email}`);
    return res.data;
  });

  console.log(classes);

  return (
    <>
      {classes ? (
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
                <th>Enrolled Students</th>
                <th>Total Seats</th>
                <th>status</th>
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
                  <td>
                    {classItem.totalStudents} <span>person</span>
                  </td>
                  <td>
                    {classItem?.feedback} <span>person</span>
                  </td>
                  <td>{classItem.seats}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      {classItem.status}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>dont</h1>
      )}
    </>
  );
}

export default MyClasses;
