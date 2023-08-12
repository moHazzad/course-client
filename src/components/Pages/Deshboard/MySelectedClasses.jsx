// import React from 'react'

import { useContext} from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
// import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useSelctedClasses from "../../Hooks/useSelctedClasses";
import Swal from "sweetalert2";

function MySelectedClasses() {
    // const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  // const { data: myselectedClasses = [], refetch } = useQuery(["myselectedClasses", user?.email], 
  //   async () => {
  //     const res = await axiosSecure.get(`/myselectedClasses/${user?.email}`);
  //     return res.data;
  //   }
  // );
  const [myselectedClasses, refetch] = useSelctedClasses()


console.log(user);
  const handleDeleteClass = async (classId) => {
    try {
      await axiosSecure.delete(`/selectedClass/${classId}`);
      Swal.fire({
        position: 'top-end',
        icon: 'delete',
        title: 'item deleted successfully.',
        showConfirmButton: false,
        timer: 1500
    });
      refetch();
    } catch (error) {
      console.error(error);
      alert("Failed to delete the class. Please try again.");
    }
  };

const price = myselectedClasses.reduce( (prev, next)=> {
     return prev + next.price}, 0 )
// console.log(price);

  


  return <div>
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
                <th>price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {myselectedClasses?.map((classItem, index) => (
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
                  
                  <th>
                    

                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDeleteClass(classItem._id)}
                    >
                      Delete
                    </button>
                  </th>
                  <th>
                    

                    <Link to={`/Dashboard/payment/${classItem._id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      Payment
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end">
            <div>
            <h1><span className="font-bold">Total Price:</span> {price}$  </h1>
          {/* <button className="btn bg-slate-500"> pay</button> */}
            </div>
          </div>
        </div>
  </div>;
}

export default MySelectedClasses;
