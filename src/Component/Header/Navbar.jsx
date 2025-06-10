import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../Provider/AuthProvider';

const Navbar = () => {
    const { user,  } = use(AuthContext)
        const links = <>
        <li><NavLink className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-[#EDF6EE]  text-[#1b9c85] underline transition-all duration-500' : ' text-gray-700 hover:bg-gray-100'
            }`} to='/'>Home</NavLink></li>
        <li><NavLink className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-[#EDF6EE]  text-[#1b9c85] underline transition-all duration-500' : ' text-gray-700 hover:bg-gray-100'
            }`} to='/addblog'>Add Blog</NavLink></li>
        <li><NavLink className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-[#EDF6EE]  text-[#1b9c85] underline transition-all duration-500' : ' text-gray-700 hover:bg-gray-100'
            }`} to='/allblogs'>All blogs</NavLink></li>
        <li><NavLink className={({ isActive }) =>
            `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-[#EDF6EE]  text-[#1b9c85] underline transition-all duration-500' : ' text-gray-700 hover:bg-gray-100'
            }`} to='/featuredblogs'> Featured Blogs</NavLink></li>



    </>
    return (
        <div className="navbar w-11/12 mx-auto">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
             {links}
                        <li>{
                    !user ? <div className='space-x-2 lg:space-x-4'>
                        <NavLink to='/login' className="text-gray-900 dark:text-gray-900 bg-blue-100 btn font-semibold">Login</NavLink>
                        <NavLink to='/register' className="text-gray-900 dark:text-gray-900 bg-blue-100 btn font-semibold">Register</NavLink>
                    </div>:' '
                }</li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end space-x-3">
    <NavLink className="relative rounded px-5 py-2.5 overflow-hidden group bg-[#1b9c85] relative hover:bg-gradient-to-r hover:from-[#1b9c85] hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
    <span className="absolute right-0 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
    <span className="relative">Login</span>
</NavLink>
   <NavLink className="relative rounded px-5 py-2.5 overflow-hidden group bg-[#1b9c85] relative hover:bg-gradient-to-r hover:from-[#1b9c85] hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
    <span className="absolute right-0 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
    <span className="relative">Wishlist</span>
</NavLink>
  </div>
</div>
    );
};

export default Navbar;