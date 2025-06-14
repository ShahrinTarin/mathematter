import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Header from '../Component/Header/Header';
import { Loader } from 'rsuite';
import Footer from '../Component/Footer';

const RootLayOut = () => {
    const { state } = useNavigation()
    return (
        <div>
            <Header></Header>
            <div className='bg-[#EDF6EE] min-h-[calc(100vh-64px)]'>
              {state == 'loading' ? <Loader></Loader> : <Outlet></Outlet>}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayOut;