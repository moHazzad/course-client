// import { useContext } from "react";
// import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
// import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import { FaGoogle } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
// import Swal from 'sweetalert2'
// import SocialLogin from "../Shared/SocialLogin/SocialLogin";
function Signup() {
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit,  formState: { errors } } = useForm();
    const { createUser, updateUserProfile,loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        // const loggedUser = data.user;
        console.log(data);

        createUser(data.email, data.password)
            .then(result => {

                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, image: data.photoURL}
                        fetch('https://course-server-seven.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    // reset();
                                    console.log(data);
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })



                    })
                    .catch(error => setErrorMessage(error.message))
            })
    };


  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col ">
        <div className="text-center ">
            <p className="py-3">Start for free</p>
            <h1 className="text-3xl font-bold">Create New Account</h1>
            <p><small>Already have an account <Link to="/login" className="font-bold">Login</Link></small></p>

        </div>
        <FaGoogle className="btn btn-circle" />
        <SocialLogin></SocialLogin>
        <div className="divider">OR</div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                    {errors.name && <span className="text-red-600">Name is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                    {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                    {errors.email && <span className="text-red-600">Email is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password"  {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                    })} placeholder="password" className="input input-bordered" />
                    {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                    {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                    {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                    {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <p className="text-red-500">{errorMessage}</p>
                <div className="form-control mt-6">
                    {
                        loading ? <button className="btn">
                        <span className="loading loading-spinner"></span>
                        loading
                      </button>:
                    <input className="btn  bg-[#1BBF72]" type="submit" value="Sign Up" />
                    }
                </div>
                
            </form>
        </div>
    </div>
</div>
  )
}

export default Signup