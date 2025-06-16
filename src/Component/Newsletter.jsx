import React from 'react';
import { Slide } from 'react-awesome-reveal';
import { toast } from 'react-toastify';
const Newsletter = () => {
    const handleSubscribe = (e) => {
        e.preventDefault()
        toast('Thank you for subscribing to our newsletter', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    return (
        <Slide delay={200}
            duration={1000}
            direction='right'>
            <div>
                <div className='grid md:grid-cols-2 lg:grid-cols-4 h-[376px] lg:px-20 pb-12  relative top-40 '>
                    <div>
                        <img className='w-full h-[376px] object-cover rounded-2xl border-2 border-[#EDF6EE]' src="https://i.ibb.co/k6P0NXcw/pngtree-abacus-black-stone-image-2649666.jpg" alt="fire photo" />
                    </div>
                    <div className='hidden md:flex'>
                        <img className='w-full object-cover rounded-2xl border-2 border-[#EDF6EE]' src="https://i.ibb.co/VKdBGYZ/360-F-99525470-x-Gg-YJDvj-POh4s-Vz-Op-YJPgz-UMK6-J7-Cbb0.jpg" alt="Physics" />
                    </div>
                    <div className='hidden lg:flex'>
                        <img className='w-full object-cover rounded-2xl border-2 border-[#EDF6EE]' src="https://i.ibb.co/4Zr7B2Yn/10-reasons-to-love-Chemistry.png" alt="chemistry" />
                    </div>
                    <div className='hidden lg:flex '>
                        <img className='w-full object-cover rounded-2xl border-2 border-[#EDF6EE]' src="https://i.ibb.co/SwNGMWwP/astrology-astronomy-black-and-white-crater.jpg" alt="astronomy" />
                    </div>

                </div>
                <div className='bg-white  md:mx-0 py-12 text-center'>
                    <h1 className='text-3xl px-4 mb-3 mt-36 lg:mt-48  text-gray-700 font-medium lg:text-5xl'>Let’s learn, explore, and thrive together! <br />Subscribe Our Newsletter
                    </h1>
                    <form onSubmit={handleSubscribe} className="join px-3 gap-2 lg:gap-5 md:mt-10 mt:8">
                        <input required type='email' className="input join-item rounded-full bg-transparent backdrop-blur-2xl w-full md:px-8 py-6 md:py-8 textarea-lg md:text-xl" placeholder="Enter Your Email" />
                        <button  className="btn join-item rounded-full py-6 md:py-8 bg-[#1b9c85]text-gray-800 border-none px-4 md:px-6 text-lg lg:text-2xl">Subscribe</button>
                    </form>
                </div>
            </div>
        </Slide>
    );
};

export default Newsletter;