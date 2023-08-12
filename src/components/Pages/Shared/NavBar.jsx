import { useContext } from "react";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../../providers/AuthProvider";
// import { FaCartPlus } from "react-icons/fa";
// import useCarts from "../../../hooks/useCarts";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

function NavBar() {
  const { user, logOut } = useContext(AuthContext);
  // const [cart] = useCarts()
  // console.log(cart);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      {/* <li>
        <Link to="/instructor">Instructors</Link>
      </li> */}
      <li>
        <Link to="/class">Classes</Link>
      </li>
      <li>
        {
            user? <Link to="/Dashboard">Dashboard</Link>: ''
        }
      </li>

      {/* <li>
          <Link to={'/dashboard/carts'} className="btn gap-2">
                cart
                <FaCartPlus />
                <div className="badge badge-secondary">+{cart?.length || 0}</div>
              </Link>
          </li> */}
    </>
  );
  return (
    // <div className=" bg-transparent fixed z-10 text-black px-5  py-2">
    <div className="navbar w-[90%] mx-auto ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-10"
          >
            {navOptions}
          </ul>
        </div>
        <Link to={'/'} className="btn btn-ghost normal-case text-xl">Courses</Link>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </label>
            <span>{user?.displayName}</span>
            <button onClick={handleLogOut} className="btn btn-ghost">
              LogOut
            </button>
          </>
        ) : (
          <>
            <Link to="login">Login</Link>
          </>
        )}
      </div>
    </div>
    // </div>
  );
}

export default NavBar;
