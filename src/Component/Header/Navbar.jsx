import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import DarkModeToggler from "./DarkModeToggler";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "You Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => { });
  };

  const linkClasses = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium transition-all duration-500
    ${isActive
      ? "bg-[#EDF6EE] text-[#1b9c85] underline dark:bg-gray-700 dark:text-[#1b9c85]"
      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    }`;

  const links = (
    <>
      <li><NavLink className={linkClasses} to="/">Home</NavLink></li>
      <li><NavLink className={linkClasses} to="/allblogs">All Blogs</NavLink></li>
      <li><NavLink className={linkClasses} to="/featuredblogs">Featured Blogs</NavLink></li>
      {user ? <><li><NavLink className={linkClasses} to="/wishlist">Wishlist</NavLink></li>
        <li><NavLink className={linkClasses} to="/addblog">Add Blog</NavLink></li>
      </> : ''}
    </>
  );

  const buttonClass =
    "relative rounded px-5 py-2.5 overflow-hidden group bg-[#1b9c85] hover:bg-gradient-to-r hover:from-[#1b9c85] hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300 dark:ring-offset-gray-900";

  return (
    <div className="navbar w-11/12 mx-auto p-0 sticky top-0 z-50 ">
      {/* Left Section */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 stroke-gray-700 dark:stroke-gray-200"
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
            <li>
              {!user ? (
                <div className="md:hidden flex space-x-3">
                  <NavLink to="/login" className={buttonClass}>
                    <span className="absolute inset-0 bg-white/10 rotate-12 transform translate-x-12 group-hover:-translate-x-40 transition-all duration-1000 ease"></span>
                    <span className="relative">Login</span>
                  </NavLink>
                  <NavLink to="/register" className={buttonClass}>
                    <span className="absolute inset-0 bg-white/10 rotate-12 transform translate-x-12 group-hover:-translate-x-40 transition-all duration-1000 ease"></span>
                    <span className="relative">Register</span>
                  </NavLink>
                </div>
              ) : (
                <div className="md:hidden flex space-x-5">
                  <div className="avatar">
                    <div className="ring-[#1b9c85] ring-offset-base-100 dark:ring-offset-gray-900 w-10 rounded-full ring-2 ring-offset-2">
                      <img src={user?.photoURL} alt="User" />
                    </div>
                  </div>
                  <NavLink onClick={handleLogOut} className={buttonClass}>
                    <span className="absolute inset-0 bg-white/10 rotate-12 transform translate-x-12 group-hover:-translate-x-40 transition-all duration-1000 ease"></span>
                    <span className="relative">Logout</span>
                  </NavLink>
                </div>
              )}
            </li>
          </ul>
        </div>
        {/* Logo */}
        <a className="md:text-3xl text-2xl font-semibold pinyon-script-regular flex items-center gap-1">
          <img className="h-5 w-5 md:h-8 md:w-10" src="/svg.svg" alt="Logo" />
          <div className="text-gray-700 dark:text-gray-300">
            Math<span className="text-[#1b9c85]">Matter</span>
          </div>
        </a>
      </div>

      {/* Center Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end">
        {!user ? (
          <div className="hidden md:flex space-x-3">
            <NavLink to="/login" className={buttonClass}>
              <span className="absolute inset-0 bg-white/10 rotate-12 transform translate-x-12 group-hover:-translate-x-40 transition-all duration-1000 ease"></span>
              <span className="relative">Login</span>
            </NavLink>
            <NavLink to="/register" className={buttonClass}>
              <span className="absolute inset-0 bg-white/10 rotate-12 transform translate-x-12 group-hover:-translate-x-40 transition-all duration-1000 ease"></span>
              <span className="relative">Register</span>
            </NavLink>
          </div>
        ) : (
          <div className="hidden md:flex space-x-5">
            <div className="avatar">
              <div className="ring-[#1b9c85] ring-offset-base-100 dark:ring-offset-gray-900 w-10 rounded-full ring-2 ring-offset-2">
                <img src={user?.photoURL} alt="User" />
              </div>
            </div>
            <NavLink onClick={handleLogOut} className={buttonClass}>
              <span className="absolute inset-0 bg-white/10 rotate-12 transform translate-x-12 group-hover:-translate-x-40 transition-all duration-1000 ease"></span>
              <span className="relative">Logout</span>
            </NavLink>
          </div>
        )}
        <div className="ml-3 text-black dark:text-white">
          <DarkModeToggler />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
