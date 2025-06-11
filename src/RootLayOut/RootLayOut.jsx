import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Component/Header/Header';

const RootLayOut = () => {
    return (
        <div>
            <Header></Header>
            <div className='bg-[#EDF6EE]'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default RootLayOut;