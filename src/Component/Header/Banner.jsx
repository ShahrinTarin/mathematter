import React from 'react';
import { NavLink } from 'react-router';
import { motion } from "motion/react";

const Banner = () => {
  return (
    <div
      className="relative hero min-h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('https://i.ibb.co.com/ycmWVV8m/6fd7fef0b1c54e0eed67a5a58f9c0a9b.jpg')",
      }}
    >
      <div className="text-center max-w-3xl px-4">
        {/* Animated Title */}
        <motion.h1
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-4xl md:text-6xl font-bold text-white leading-snug alegreya drop-shadow-lg"
        >
          Exploring{" "}
          <motion.span
            animate={{
              color: [
                "#a8a432",
                "#32a834",
                "#3258a8",
                "#5432a8",
                "#a8328d",
                "#a83242",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            math
          </motion.span>{" "}
          through growth, <br /> discovery, and curiosity.
        </motion.h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg md:text-xl text-gray-200 alegreya-sans leading-relaxed drop-shadow-md">
          Dedicated to making math engaging, inspiring others to learn
          through clear explanations, logic, and curiosity.
        </p>

        {/* Button */}
        <div className="mt-10">
            <div>
              <NavLink to='/' className="font-semibold px-8 py-3  overflow-hidden group bg-[#1b9c85] relative hover:bg-gradient-to-r hover:from-[#1b9c85] hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                <span className="absolute right-0 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">GET  INSPIRED</span>
              </NavLink>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
