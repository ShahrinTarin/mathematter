import React from 'react';


const Mission = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 '>
            <div>
                <img className='h-full w-full' src="https://i.ibb.co/TDJRBv1K/math.jpg" alt="" />
            </div>
            <div className='bg-white flex-col h-full flex justify-center py-10 mb-16 pl-10 md:pl-12'>
                <h1 className='text-4xl font-bold alegreya mb-10'>Our Blogs <span className='text-[#1b9c85]'>Mission</span></h1>
                <p className='text-[#454F5E] w-3/4 mb-10'>MathMatter is dedicated to transforming mathematical learning into an engaging, accessible journey for all. Through innovative explanations, interactive problem-solving, and real-world applications, we bridge the gap between abstract theory and practical understanding. Our platform empowers students, educators, and lifelong learners to master concepts with confidence—unlocking the beauty and power of mathematics in everyday life and scientific discovery.
                <br /><br /> Join us on a journey of mathematical discovery, where numbers unlock new worlds, equations inspire change and empowered way of thinking. At MathMatter, we make math meaningful—transforming challenges into triumphs and curiosity into mastery. Explore, learn, and grow with us!
                </p>
                 <div>
                    <button className="relative cursor-pointer rounded px-8 py-2.5 overflow-hidden group bg-[#1b9c85] hover:bg-gradient-to-r hover:from-[#1b9c85] hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
              <span className="absolute right-0 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">Subscribe Now</span>
            </button>
                 </div>
            </div>
        </div>
    );
};

export default Mission;