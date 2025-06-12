
import { useState } from 'react';
import { useLoaderData } from 'react-router';
const BlogDetails = () => {
    //  const { user } = use(AuthContext);
    const blog = useLoaderData()
    const [showFullDescription, setShowFullDescription] = useState(false);
    const WORD_LIMIT = 100;

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const getTruncatedDescription = (text) => {
        const words = text.trim().split(' ');
        if (words.length <= WORD_LIMIT || showFullDescription) {
            return text;
        }
        return words.slice(0, WORD_LIMIT).join(' ') + '...';
    };

    const displayText = getTruncatedDescription(blog.long_description);
    return (
        <div className='min-h-[calc(100vh-64px)] flex items-center justify-center '>
            <div className='lg:p-10 p-6'>
                <div className="flex flex-col max-w-5xl p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                    <div className='flex justify-between'>
                        <div className="flex space-x-4">
                            <img alt="" src={blog.photourl} className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500" />
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
                        <p className="text-sm ">{displayText}
                            {blog.long_description.trim().split(' ').length > WORD_LIMIT && (
                                <button
                                    onClick={toggleDescription}
                                    className="ml-2 text-[#1b9c85] hover:underline text-xs"
                                >
                                    {showFullDescription ? 'See Less' : 'See More'}
                                </button>
                            )}</p>
                    </div>
                </div>
            </div>

            <div>
                <StyledWrapper>
                    <div className="form-container">
                        <form className="form">
                            <div className="form-group">
                                <label htmlFor="email">Company Email</label>
                                <input required name="email" id="email" type="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="textarea">How Can We Help You?</label>
                                <textarea required cols={50} rows={10} id="textarea" name="textarea" defaultValue={"          "} />
                            </div>
                            <button type="submit" className="form-submit-btn">Submit</button>
                        </form>
                    </div>
                </StyledWrapper>
            </div>
        </div>
    );
};



export default BlogDetails;