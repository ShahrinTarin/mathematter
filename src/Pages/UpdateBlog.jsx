import axios from 'axios';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';

const UpdateBlog = () => {
    const blog = useLoaderData()
    const [newblog, setnewblog] = useState(blog)
    const handleupdate = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const updatedBlog = Object.fromEntries(formData.entries())
        axios.put(`http://localhost:3000/blogs/${newblog._id}`, updatedBlog)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Blog Updated Successfully!",
                        icon: "success",
                        draggable: true,
                        timer: 1500
                    });

                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div className='min-h-[calc(100vh-64px)]'>
            <div className='py-12 w-11/12 mx-auto'>
                <div className='mb-8 text-center space-y-4'>
                    <h1 className="text-5xl font-medium mb-5 text-gray-700">Update Your Blog</h1>

                </div>
                <form onSubmit={handleupdate} className='bg-transparent rounded-2xl shadow-2xl  p-8 lg:w-6/12 mx-auto'>
                    <div className=''>

                        <fieldset className="fieldset bg-transparent border-none w-full border p-4">
                            <label className="label text-lg text-gray-700 ">Title</label>
                            <input defaultValue={newblog.title} name='title' type="text" className="input text-gray-700  w-full bg-white" placeholder="Enter Title" required />
                        </fieldset>

                        <fieldset className="fieldset bg-transparent  border-none w-full border p-4">
                            <label className="label text-lg text-gray-700 ">Image</label>
                            <input defaultValue={newblog.image} name='image' type="text" className="input w-full text-gray-700  bg-white" placeholder="Enter photo URL" required />
                        </fieldset>

                        <fieldset className="fieldset bg-transparent border-none w-full p-4">
                            <label className="label text-lg text-gray-700 ">Category</label>
                            <select
                                name='category'
                                defaultValue={newblog.category}
                                className="w-full  bg-white p-2.5 rounded input text-gray-700  appearance-none pr-8"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml;utf8,<svg  height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 10px center',
                                }}
                            >
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Astronomy">Astronomy</option>
                                <option value="Statistics">Statistics</option>
                            </select>
                        </fieldset>

                        <fieldset className="fieldset bg-transparent  border-none w-full border p-4">
                            <label className="label text-lg text-gray-700 ">Short Description</label>
                            <input defaultValue={newblog.short_description} name='short_description' type="text" className="input text-gray-700  w-full bg-white" placeholder="Enter Short Description" required />
                        </fieldset>

                        <fieldset className="fieldset bg-transparent  border-none w-full border p-4">
                            <label className="label text-lg text-gray-700 ">Long Description</label>
                            <input defaultValue={newblog.long_description} name='long_description' type="text" className="input text-gray-700  w-full bg-white" placeholder="Enter Long Description" required />
                        </fieldset>
                    </div>

                    <button type='submit' className="cursor-pointer px-5 py-2.5 lg:mt-5 relative rounded group text-white font-medium inline-block w-full text-center">
                        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-gray-600 to-[#1b9c85]"></span>
                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-gray-600 to-[#1b9c85]"></span>
                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-600 to-[#1b9c85]"></span>
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-gray-600 from-[#1b9c85]"></span>
                        <span className="relative">Update Blog </span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateBlog;