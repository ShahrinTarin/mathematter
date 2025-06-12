import React from 'react';
import BlogCard from './BlogCard';

const RecentCardContainer = ({recentblogs}) => {
   
    return (
        <div>
            <div className='grid grid-cols-1 p-12 lg:grid-cols-3 md:grid-cols-2 gap-4 gap-y-8 lg:w-9/12 w-11/12  mx-auto'>
                {
                    recentblogs?.map(blog => <BlogCard key={blog._id} blog={blog}></BlogCard>)
                }
            </div>
        </div>
    );
};

export default RecentCardContainer;