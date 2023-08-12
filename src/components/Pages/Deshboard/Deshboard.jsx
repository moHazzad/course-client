// import React from 'react'

import { Link, NavLink, Outlet } from "react-router-dom"
import useAdmin from "../../Hooks/UseAdmin"
import useInstructor from "../../Hooks/useInstructor";
import { FaUsers, FaVideo } from "react-icons/fa";
// import useUsers from "../../Hooks/useUsers";
import { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

function Deshboard() {
  // const [instructors, setInstructors] = useState([]);
  // const [error, setError] = useState(null);


const {user, loading} = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [isInstructor  ] = useInstructor()
    


    const {data: instructor = [], isLoading } = useQuery({
      queryKey: ['instructor'], enabled: !loading, queryFn: async ()=>{
        const res = await fetch('https://course-server-seven.vercel.app/instructor');

        return res.json()
      }


    })

    if(isLoading){
      return <h2>Loading</h2>
    }
    else{

      const email  = instructor.find(res => res?.email == user?.email )
      // console.log(instructor);
      // console.log(user?.email);
          console.log(email);
          
    }


    return (
      <div className="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    {/* flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-pink-200 */}
    
    <div className="drawer-content py-10 px-5 items-center justify-center bg-gradient-to-r from-pink-100 to-pink-200">
        
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
        
        <Outlet />
      
      
      </div>
      
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
      <ul className="menu p-4 w-80 h-full bg-white text-base-content">
        {/* Sidebar content here */}
        
            <li className="font-bold mb-3 text-xl"><Link to={'/Dashboard/manageUsers'}>Courses</Link></li>
{/* todo loader  to be add */}


            { isAdmin && isAdmin ? (
                        <><li><NavLink to="/Dashboard/manageClasses" className={({ isActive }) =>
                        isActive ? 'text-slate-950 font-semibold' : 'text-slate-400'
                       }> <FaVideo /> Manage Classes</NavLink>
                        </li>
                            <li><NavLink to="/Dashboard/manageUsers" className={({ isActive }) =>
                        isActive ? 'text-slate-950 font-semibold' : 'text-slate-400'
                       }> <FaUsers /> Manage Users</NavLink>
                            </li></>
                    ) : isInstructor ? (
                        <><li><NavLink  to="/Dashboard/addClasses" className={({ isActive }) =>
                        isActive ? 'text-slate-950 font-semibold' : 'text-slate-400'
                       }>Add a Class</NavLink></li>
                            <li><NavLink to="/Dashboard/myClasses" className={({ isActive }) =>
                        isActive ? 'text-slate-950 font-semibold' : 'text-slate-400'
                       }>My Classes</NavLink></li>
                        </>
                    ) : (
                        <><li><NavLink to={"/Dashboard/mySelectedClasses"} className={({ isActive }) =>
                        isActive ? 'text-slate-950 font-semibold' : 'text-slate-400'
                       }>My Selected Classes</NavLink></li>
                            <li><NavLink to={"/Dashboard/MyEnrolledClasses"} className={({ isActive }) =>
                        isActive ? 'text-slate-950 font-semibold' : 'text-slate-400'
                       }>My Enrolled Classes</NavLink></li>
                            <li><NavLink to={"/Dashboard/paymentHistory"} className={({ isActive }) =>
                        isActive ? 'text-slate-950 font-semibold' : 'text-slate-400'
                       }>Payment History</NavLink></li>
                       </>
                    )}

          
                            
        
        <li><Link to={'/'}>Home</Link></li>
      </ul>
    
    </div>
  </div>
  
  
  )
}

export default Deshboard