import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Component/Header/Header';

const RootLayOut = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayOut;