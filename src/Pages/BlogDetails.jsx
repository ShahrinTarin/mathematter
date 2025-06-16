import { use, useEffect, useState } from 'react';
import { NavLink, useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';
const BlogDetails = () => {
    const { user } = use(AuthContext);
    const blog = useLoaderData()
    const [comment, setcomment] = useState([])
    
    useEffect(() => {
        if (!user) {
            return;
        }

        axios(`https://assignment-11-server-two-drab.vercel.app/comment/${blog._id}`)
            .then(data => {
                setcomment(data?.data)
            })
            .catch(err => {
                console.log(err)
            })

           
    }, [user, blog._id])

    const handlecomments = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form);
        const comment = {
            ...Object.fromEntries(formData.entries()),
            blogId: blog._id,
            userEmail: user?.email,
            userName: user?.displayName,
            userphoto: user?.photoURL,
        }
        axios.post(`https://assignment-11-server-two-drab.vercel.app/comment/${blog._id}`, comment)
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
                        title: " Your comment added Successfully!",
                        icon: "success",
                        draggable: true,
                        timer: 1500
                    });
                }
                form.reset();


                setcomment(prev => [
                    ...prev,
                    {
                        ...comment
                    }
                ]);
            })
    }
    const [showFullDescription, setShowFullDescription] = useState(false);
    const WORD_LIMIT = 100;

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const getTruncatedDescription = (text) => {
    if (!text) return 'No description available';
    const words = text.trim().split(' ');
    if (words.length <= WORD_LIMIT || showFullDescription) {
        return text;
    }
    return words.slice(0, WORD_LIMIT).join(' ') + '...';
};
    const displayText = getTruncatedDescription(blog.long_description);

    return (
        <div className='min-h-[calc(100vh-64px)] pb-12 flex flex-col items-center justify-center '>
            <div className='lg:p-10 p-6'>
                <div className="flex flex-col max-w-5xl p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                    <div className='flex justify-between'>
                        <div className="flex space-x-4">
                            <img alt="" src={blog?.photourl} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
                            <div className="flex flex-col space-y-1">
                                <a rel="noopener noreferrer" href="#" className="text-sm font-semibold">{blog.email}</a>
                                <span className="text-xs dark:text-gray-600">{blog.createdAt}</span>
                            </div>
                        </div>
                        <div className="space-x-2 badge badge-soft badge-outline">
                            {blog.category}
                        </div>
                    </div>
                    <div>
                        <img src={blog.image} alt="" className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500" />
                        <h2 className="mb-3 text-2xl font-bold">{blog.title}</h2>
                        <h2 className="mb-2 text-gray-700 text-xl font-semibold">{blog.short_description}</h2>
                        <p className="text-sm ">
                            {blog?.long_description ? displayText : 'No description available'}
                            {blog?.long_description && blog.long_description.trim().split(' ').length > WORD_LIMIT && (
                                <button onClick={toggleDescription} className="ml-2 text-[#1b9c85] hover:underline text-xs">
                                    {showFullDescription ? 'See Less' : 'See More'}
                                </button>
                            )}
                        </p>
                    </div>

                    {blog.email == user?.email ? <div><NavLink to={`/updateblog/${blog._id}`} className=" rounded px-5 py-2.5 overflow-hidden group bg-[#1b9c85] relative hover:bg-gradient-to-r hover:from-[#1b9c85] hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                        <span className="absolute right-0 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                        <span className="relative">Update Blog</span>
                    </NavLink></div> : ''}
                </div>
            </div>
            <h1 className='text-3xl font-semibold mb-3 text-gray-700'>Comments</h1>
            <div className='lg:w-1/2 w-full bg-base-200 py-12 rounded-lg shadow-2xl px-7'>

                {
                    blog.email == user?.email ? <p className='text-red-400 text-sm'>You can't Comment on Your Own Blog</p> : <div><h1 className='mb-4 text-gray-700 font-medium'>Add Your Comment...</h1>
                        <form onSubmit={handlecomments}>
                            <div className="avatar">
                                <div className="ring-[#1b9c85] ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                            <textarea required name='comment' placeholder="Write a Comment..." className="textarea w-full textarea-accent"></textarea>
                            <div className='text-end'>
                                <button type='submit' className="mt-10 cursor-pointer  px-5 py-2.5 lg:mt-5 relative rounded group text-white font-medium inline-block text-center">
                                    <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-gray-600 to-[#1b9c85]"></span>
                                    <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-gray-600 to-[#1b9c85]"></span>
                                    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-gray-600 to-[#1b9c85]"></span>
                                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-gray-600 from-[#1b9c85]"></span>
                                    <span className="relative">Comment</span>
                                </button>
                            </div>
                        </form></div>
                }

                <div className='mt-5'>
                    <p className='text-xs text-[#1b9c85] mb-0'>{comment.length} People Commented on this Blog</p>
                    {comment.map(singcomment => <div key={singcomment._id} className="py-3 card rounded-md mt-4 w-full bg-base-100 card-xs  shadow-sm">
                        <div className="flex  items-center pl-3 gap-3">
                            <div className="avatar">
                                <div className="ring-[#1b9c85] ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2">
                                    <img src={singcomment.userphoto} />
                                </div>
                            </div>
                            <div className="card-body overflow-auto">
                                <h2 className="card-title">{singcomment.userName}</h2>
                                <p>{singcomment.comment}</p>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;