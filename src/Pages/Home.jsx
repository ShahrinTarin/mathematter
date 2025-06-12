import React from 'react';
import Banner from '../Component/Header/Banner';
import BlogCard from '../Component/BlogCard';
import { motion } from "motion/react";
import { useLoaderData } from 'react-router';
import RecentCardContainer from '../Component/RecentCardContainer';
const Home = () => {
    const recentblogs = useLoaderData()
    return (
        <div className='min-h-[calc(100vh-64px)]'>
            <Banner></Banner>
            <div>
                <div className='mb-5 text-center space-y-4 mt-20 w-9/12 mx-auto lg:w-7/12'>
                    <h1 className="text-5xl font-medium mb-5 text-gray-700">Recent <motion.span animate={{transition:{duration:6 ,repeat:Infinity} ,color:['#a8a432','#32a834','#3258a8','#5432a8','#a8328d','#a83242']} }>Six</motion.span> Blogs</h1>
                    <p className='text-gray-600 font-light text-sm px-4' >These six recent blog posts explore exciting developments, timeless scientific concepts, and inspiring educational insights. From breakthroughs in technology to deep dives into natural phenomena, each article offers a distinct  perspective that fuels curiosity and critical thinking. Whether you're interested in innovative research, practical learning strategies, or science's role in everyday life, these blogs provide valuable knowledge for students, educators, and lifelong learners alike. Their growing appeal lies in the way they combine clarity with depth, turning complex topics into engaging, accessible learning experiences.
                    </p>
                </div>
                <RecentCardContainer recentblogs={recentblogs} ></RecentCardContainer>
            </div>
        </div>
    );
};

export default Home;