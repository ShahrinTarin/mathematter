import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-[#EDF6EE] dark:bg-gray-900 backdrop-blur-md shadow-md">
      <Navbar />
    </div>
  );
};

export default Header;