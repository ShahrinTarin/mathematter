import React, { useEffect, useState } from 'react';
import BlogCard from '../Component/BlogCard';

const AllBlogs = () => {
    const [initialBlogs, setInitialBlogs] = useState([])
    const [search, setSearch] = useState(' ')
    useEffect(() => {
        fetch(`http://localhost:3000/blogs?searchParams=${search}`)
            .then(res => res.json())
            .then(data => setInitialBlogs(data))
    }, [search])
    return (
        <div className=' min-h-[calc(100vh-64px)]'>

            <div>
                <div className='pt-12 md:flex justify-between lg:w-9/12 w-11/12  mx-auto space-y-4 '>
                    <h1 className=" text-3xl lg:text-5xl pl:12 font-semibold text-gray-700">All <span className='text-[#1b9c85]'>blogs Here</span></h1>
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