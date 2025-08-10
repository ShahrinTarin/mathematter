import React, { use, useEffect, useState } from 'react';
import BlogCard from '../Component/BlogCard';
import { AuthContext } from '../Provider/AuthProvider';
import Loader from '../Component/Loader';
import axios from 'axios';

const AllBlogs = () => {
    const { loading } = use(AuthContext)
    const [initialBlogs, setInitialBlogs] = useState([])
    const [search, setSearch] = useState('')
    const [searchTitle, setSearchTitle] = useState('')
    useEffect(() => {
        axios(`https://assignment-11-server-two-drab.vercel.app/blogs?category=${search}&title=${searchTitle}`)
            .then(data => setInitialBlogs(data.data))
    }, [search, searchTitle])
    if (loading) {
        return <Loader></Loader>
    }

    return (
        <div className=' min-h-[calc(100vh-64px)]'>
            <div>
                <div className='lg:w-9/12 pt-12 w-11/12 px-10 mx-auto space-y-4'>
                    <label className="input w-full bg-white text-gray-800 dark:bg-black dark:text-white">
                        <svg
                            className="h-[1em] opacity-70 text-gray-600 dark:text-gray-300"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"

                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>

                        <input
                            onChange={(e) => setSearchTitle(e.target.value)}
                            type="search"
                            className="grow bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="Search by Title"
                        />

                        <kbd className="kbd text-white bg-gray-600 dark:bg-black   dark:text-white kbd-sm">⌘</kbd>
                        <kbd className="kbd text-white dark:bg-black  bg-gray-500 dark:text-white kbd-sm">K</kbd>
                    </label>
                </div>


                <div className='pt-12 md:flex justify-between lg:w-9/12 w-11/12  mx-auto space-y-4 '>
                    <h1 className=" text-3xl lg:text-5xl pl:12 font-semibold text-gray-700 dark:text-gray-400">All <span className='text-[#1b9c85]'>blogs Here</span></h1>
                    <div>
                        <select
                            name="category"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#EDF6EE] p-2.5 px-5 rounded input text-gray-800 appearance-none md:pr-8"
                            style={{
                                backgroundImage: `url("data:image/svg+xml;utf8,<svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 10px center',
                            }}
                        >
                            <option value="">All</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Astronomy">Astronomy</option>
                            <option value="Statistics">Statistics</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-1 p-12 lg:grid-cols-4 md:grid-cols-2 gap-4 gap-y-12 lg:w-9/12 w-11/12 mx-auto'>
                    {
                        initialBlogs.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)
                    }
                </div>
            </div>

        </div>
    );
};

export default AllBlogs;