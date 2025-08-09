import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Header from '../Component/Header/Header';
import { Loader } from 'rsuite';
import Footer from '../Component/Footer';
import { ThemeProvider } from '../Provider/ThemeContext';


const RootLayOut = () => {
    const { state } = useNavigation()
    return (
             <ThemeProvider>
        <div>
            <Header></Header>
            <div className='bg-[#EDF6EE] dark:bg-gray-900 min-h-[calc(100vh-64px)]'>
              {state == 'loading' ? <Loader></Loader> : <Outlet></Outlet>}
            </div>
            <Footer></Footer>
        </div>
        </ThemeProvider>
    );
};

export default RootLayOut;