import React, { use, useState } from 'react';
import { NavLink } from 'react-router';
import { Card, Text, Button, TagGroup, Tag } from 'rsuite';
import styled from 'styled-components';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Zoom } from 'react-awesome-reveal';
const BlogCard = ({ blog }) => {
  const [newblog, setnewblog] = useState(blog)
  const { user } = use(AuthContext)
  const handleWishlist = () => {
    const wishlist = {
      blogId: blog._id,
      userEmail: user?.email
    }
    axios.post(`https://assignment-11-server-two-drab.vercel.app/wishlist/${newblog._id}`, wishlist)
      .then(data => {
        if (!user) {
          Swal.fire({
            title: "Please Login first",
            icon: "warning",
            draggable: true,
            timer: 1500
          });
          return;
        }

        if (data.data.insertedId) {
          Swal.fire({
            title: "Blog added to Your Wishlist Successfully!",
            icon: "success",
            draggable: true,
            timer: 1500
          });
        }
        setnewblog(prev => {
          return { ...prev }
        })
      })
  }
  return (
    <Zoom delay={200}>
      <div className="relative flex  flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
          <img className='h-full w-full' src={newblog.image} alt="" />
          <StyledWrapper>
            <div className="badge left-0.5 z-10 relative -top-40" >
              {newblog.category}
              <span />
            </div>
          </StyledWrapper>
        </div>

        <div className="p-6">
          <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {newblog.title}
          </h5>
          <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
            {newblog.short_description}
          </p>
        </div>
        <div className="p-6 pt-0 flex justify-between flex-wrap gap-5">
          <NavLink to={`/blogdetails/${newblog._id}`} className="relative rounded px-4 py-2 overflow-hidden group bg-[#1b9c8496] hover:bg-gradient-to-r hover:from-[#1b9c8444] hover:to-green-400 text-gray-700 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Blog Details</span>
          </NavLink>
          <NavLink to={`/wishlist/${user?.email}`} onClick={handleWishlist} className="relative rounded px-4 py-2 overflow-hidden group bg-[#1b9c842a] hover:bg-gradient-to-r hover:from-[#1b9c8444] hover:to-green-400 text-gray-700 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
            <span className="absolute right-0 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Add Wishlist</span>
          </NavLink>
        </div>
      </div>
    </Zoom>
  );
};

const StyledWrapper = styled.div`
  .badge {
    position: relative;
    text-decoration: none;
    padding: 8px 16px;
    color: #1b9c85;
    font-weight: 500;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    background: transparent;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);

    border-radius: 999px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    user-select: none;
  }

  .badge span {
    width: 25px;
    height: 25px;
    position: absolute;
    top: -12px;
    right: -2px;
    transform: rotate(-20deg);
    filter: blur(0.5px);
  }

  .badge span:before,
  .badge span:after {
    content: "";
    position: absolute;
  }

  .badge span:before {
    width: 1px;
    height: 100%;
    left: 12px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(255, 255, 255, 0.7),
      transparent
    );
  }

  .badge span:after {
    width: 100%;
    height: 1px;
    top: 12px;
    background: linear-gradient(
      to left,
      transparent,
      rgba(255, 255, 255, 0.7),
      transparent
    );
  }

  .badge:hover span:after {
    display: block;
    animation: rotate 3s ease-in-out; /* Adjust timing as needed */
  }
  .badge:hover span::before {
    display: block;
    animation: rotate 3s ease-in-out; /* Adjust timing as needed */
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1.8);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }

  .badge:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(105, 106, 111, 0.37);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    border-radius: 999px;
  }

  .inspired {
    position: absolute;
    bottom: 8%;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .inspired:hover {
    color: rgba(255, 255, 255, 0.8);
  }`;

export default BlogCard;