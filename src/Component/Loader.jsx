import React from 'react';


const Loader = () => {
  return (
  <div className='pt-25 h-screen md:pt-40 lg:pt-72 p-24  place-items-center'>
     <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-18 w-18 border-t-2 border-b-2 border-[#1b9c85]"></div>
      </div>
  </div>
  );
}



export default Loader;
