import React from 'react';
import { Link, useRouteError } from 'react-router';


const ErrorPage = () => {

    const error = useRouteError()
    return (
        <>
            <div className='py-24 text-center place-items-center h-screen '>
                <img className='w-80 h-80 mb-5 rounded-2xl shadow-2xl' src="https://i.ibb.co/tpsfzRC5/error.jpg" alt="" />
                <h1 className='mb-8 text-5xl font-semibold  text-[#1b9c85]'>
                    {error?.status || 404} - Page not found
                </h1>
                <p className='mb-5 text-xl font-bold text-gray-500 md:text-2xl'>
                    Ooops!! the page you're looking for doesn't exist.
                </p>
                <Link to='/'>
                    <button className="relative inline-flex cursor-pointer items-center justify-center px-7 py-3 text-xl overflow-hidden font-mono font-medium tracking-tighter text-white bg-[#1b9c85] rounded-lg group">
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-gray-800 rounded-full group-hover:w-56 group-hover:h-56"></span>
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                        <span className="relative">Go To HomePage</span>
                    </button>
                </Link>
            </div>
        </>
    );
};

export default ErrorPage;