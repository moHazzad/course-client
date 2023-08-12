// import React from 'react'
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

function AddClass() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          console.log(imgURL, data);
          const { name, price, seats, email, instructor } = data;
          const newClass = {
            name,
            price: parseFloat(price),
            seats,
            email,
            instructor,
            image: imgURL,
            status: "pending",
            totalStudents: 0,
          };
          console.log(newClass);
          axiosSecure.post("/classes", newClass).then((data) => {
            console.log("after posting new class item", data.data);
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "class  added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              setLoading(false);
            }
          });
        }
      });
  };

  return (
    <div className="w-full px-10">
      {/* <SectionTitle subHeading="What's new" heading="Add an item" ></SectionTitle> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Class Name*</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register("name", { required: true, maxLength: 120 })}
            className="input input-bordered w-full "
          />
        </div>
        <div className="flex my-4">
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Available seats*</span>
            </label>
            <input
              type="number"
              {...register("seats", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
        </div>
        <div className="flex my-4">
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Email*</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              value={user?.email}
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Name*</span>
            </label>
            <input
              type="text"
              {...register("instructor", { required: true })}
              value={user?.displayName}
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Item Image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </div>
        {loading ? (
          <button className="btn">
            <span className="loading loading-spinner"></span>
            loading
          </button>
        ) : (
          <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
        )}
      </form>
    </div>

    // <div className="text-center">
    //   <div className="grid grid-cols-2">
    //   <div className="form-control">
    //     <label className="label">
    //       <span className="label-text">Class Name</span>
    //     </label>
    //     <label className="input-group">
    //       <span>Class Name</span>
    //       <input
    //         type="text"
    //         placeholder="Illustrations"
    //         className="input input-bordered"
    //       />
    //     </label>
    //   </div>
    //   <div className="form-control ">
    //     <label className="label">
    //       <span className="label-text">Your Course Image</span>
    //     </label>
    //     <label className="input-group">
    //       <span>Image</span>
    //       <input
    //         type="file"
    //         placeholder=""
    //         className="input input-bordered"
    //       />
    //     </label>
    //   </div>
    //   <div className="form-control ">
    //     <label className="label">
    //       <span className="label-text">Your Email</span>
    //     </label>
    //     <label className="input-group">
    //       <span>Email</span>
    //       <input
    //         type="email"
    //         value={user.email}
    //         className="input input-bordered"
    //       />
    //     </label>
    //   </div>
    //   <div className="form-control ">
    //     <label className="label">
    //       <span className="label-text">Your Name</span>
    //     </label>
    //     <label className="input-group">
    //       <span>Name</span>
    //       <input
    //         type="email"
    //         value={user.displayName}
    //         className="input input-bordered"
    //       />
    //     </label>
    //   </div>
    //   <div className="form-control">
    //     <label className="label">
    //       <span className="label-text">Available seats</span>
    //     </label>
    //     <label className="input-group">
    //       <span>seats</span>
    //       <input
    //         type="number"
    //         placeholder="135"
    //         className="input input-bordered"
    //       />
    //     </label>
    //   </div>
    //   <div className="form-control">
    //     <label className="label">
    //       <span className="label-text">Course Price</span>
    //     </label>
    //     <label className="input-group">
    //       <span>Price</span>
    //       <input
    //         type="number"
    //         placeholder="999 $"
    //         className="input input-bordered"
    //       />
    //     </label>
    //   </div>

    // </div>
    // <button type="submit" className="btn btn-ghost my-6">Add Class</button>
    // </div>
  );
}

export default AddClass;
