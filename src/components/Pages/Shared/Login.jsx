// import React from 'react'

// import { useContext } from "react";
// import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate} from 'react-router-dom';
import SocialLogin from './SocialLogin';
// import SocialLogin from "./SocialLogin";
// import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

function Login() {
  const [error, setError] = useState("");
  const { signIn ,loading, googleSignIn,} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // useEffect(() => {
  //     loadCaptchaEnginge(6);
  // }, [])

  const handleLogin = event => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;
      console.log(email, password);
      signIn(email, password)
          .then(result => {
              const user = result.user;
              console.log(user);
              Swal.fire({
                  title: 'User Login Successful.',
                  showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                  }
              });
              navigate(from, { replace: true });
          })
          .catch((err) => {
            setError(err.message)
            loading(false)
          })
  }

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate("/");
        Swal.fire({
            title: 'User Login Successful.',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        // toast("Welcome");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
   
    <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center ">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-3"><small>New Here? <Link to="/signup" className='font-bold'>Create an account</Link> </small></p>
                        {/* <p>Initially </p> */}

                    </div>
                    <button onClick={handleGoogleSignIn}><FaGoogle className="btn btn-circle" /></button>
        <SocialLogin></SocialLogin>
        <div className="divider">OR</div>
                    <div className="card  shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin}  className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" defaultValue={'moehazzad124@gmail.com'}  className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" defaultValue={'Mm@123456'}  className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha}  type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            </div> */}
                            <p className='text-red'>{error}</p>
                            <div className="form-control mt-6">
                                {
                                    loading ? <button className="btn">
                                    <span className="loading loading-spinner"></span>
                                    loading
                                  </button>:<input  className="btn  bg-[#1BBF72]" type="submit" value="Login" />
                                }
                            </div>

                        </form>
                        <div className='text-center py-2'>
                            <p></p>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default Login