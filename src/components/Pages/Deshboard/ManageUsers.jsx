// import React from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from "sweetalert2";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import useUsers from "../../Hooks/useUsers";

const ManageUsers = () => {

  const [users,refetch] = useUsers()
  // const [axiosSecure] = useAxiosSecure();
  // const { data: users = [], refetch } = useQuery(["users"], async () => {
  //   const res = await axiosSecure.get("/users");
  //   return res.data;
  // });

  const handleAdmin = (user) => {
    console.log(user);
    fetch(`https://course-server-seven.vercel.app/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleInstructor = (user) => {
    fetch(`https://course-server-seven.vercel.app/users/instructor/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Instructor Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleToggle = (user) => {
    if (user.role === "admin") {
      handleInstructor(user);
    } else {
      handleAdmin(user);
    }
  };

  return (
    <div className="w-full ">
      <h3 className="text-3xl font-semibold my-4">
        Total Users : {users.length}
      </h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Admin/Instructor</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td className="py-0 px-0">{user.name}</td>
                <td className="py-0 px-0">{user.email}</td>
                <td className="py-0 px-0">{user.role}</td>
                <td className="py-0 px-0">
                  <label>
                    <input
                      title={`${user.name} is ${
                        user.role ? user.role : "Student"
                      } now`}
                      type="checkbox"
                      className="toggle"
                      checked={user.role === "instructor"}
                      onChange={() => handleToggle(user)}
                    />
                    {user.role
                      ? user.role === "instructor"
                        ? "Instructor"
                        : "Admin"
                      : "Student"}
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
