import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Header from '../Component/Header/Header';

const RootLayOut = () => {
    const { state } = useNavigation()
    return (
        <div>
            <Header></Header>
            <div className='bg-[#EDF6EE]'>
              {state == 'loading' ? <p>loading...</p> : <Outlet></Outlet>}
            </div>
        </div>
    );
};

export default RootLayOut;