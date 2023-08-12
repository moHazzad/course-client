// import React from 'react'

import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
// import useSelctedClasses from "../../Hooks/useSelctedClasses"

function MyEnrolledClasses() {
    const {user} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
   const { data: enrolled = [], refetch } = useQuery(["enrolled", user?.email], 
    async () => {
      const res = await axiosSecure.get(`/enrolled/${user?.email}`);
      return res.data;
    }
  );

  return (<>
    <div>{enrolled.length}</div>
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
                
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {enrolled?.map((classItem, index) => (
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
                  <td>{classItem.price}</td>
                  
                  
                  
                  
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end">
            {/* <div>
            <h1><span className="font-bold">Total Price:</span> {price}$  </h1>
            </div> */}
          </div>
        </div>
  </>

  )
}

export default MyEnrolledClasses