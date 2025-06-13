import React from 'react';
import { Link } from 'react-router';

const EmptyPage = () => {
      return (
        <div className='py-16 text-center lg:w-11/12 mx-auto col-span-4'>
        <h1 className='mb-3 text-7xl font-thin text-[#1b9c85]'>No Blog
             Found!</h1>
        <p className='mb-8 text-xl  text-[#1b9c85] md:text-2xl'>
          Add a Blog to your Wishlist
        </p>
        <Link to='/allblogs'>
        <button className="relative inline-block text-lg group cursor-pointer">
                    <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-[#1b9c85] transition-colors duration-300 ease-out border-2 border-[#244d45] rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-blue-50"></span>
                        <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-[#1b9c85] group-hover:-rotate-180 ease"></span>
                        <span className="relative">Add Wishlist</span>
                    </span>
                    <span className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                </button>
        </Link>
      </div>
    );
};

export default EmptyPage;