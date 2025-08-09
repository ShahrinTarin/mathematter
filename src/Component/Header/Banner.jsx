import React from 'react';
import { NavLink } from 'react-router';
import { motion } from "motion/react";
const Banner = () => {
  return (
    <div className="hero bg-[#EDF6EE] min-h-[70vh] bg-[url(https://i.ibb.co/KcBrKWK0/rubber-blank-paper-cute-pink-education-mathematics-powerpoint-background-a6aa809926-960-540.jpg)] min-h-[70vh]">
      <div className="hero-content text-center">
        <div className="">
          <div className='text-center'>
            <motion.h1 animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }} className='text-3xl md:text-5xl font-medium text-center alegreya text-[#0F172A]'>Exploring <motion.span animate={{ transition: { duration: 6, repeat: Infinity }, color: ['#a8a432', '#32a834', '#3258a8', '#5432a8', '#a8328d', '#a83242'] }}>math</motion.span> through growth, <br /> discovery, and curiosity.</motion.h1>
            <p className='text-center text-sm mt-5 mb-8 text-[#525a66] alegreya-sans '>Dedicated to making math engaging, inspiring others to learn <br /> through clear explanations, logic, and curiosity.</p>
            <div>
              <NavLink to='/' className="font-semibold px-8 py-3  overflow-hidden group bg-[#1b9c85] relative hover:bg-gradient-to-r hover:from-[#1b9c85] hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                <span className="absolute right-0 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">GET  INSPIRED</span>
              </NavLink>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;