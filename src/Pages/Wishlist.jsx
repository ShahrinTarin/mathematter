import React, { use } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


const Wishlist = () => {
    const {user}=use(AuthContext)
    
    return (
        <div className='min-h-[calc(100vh-64px)] w-11/12 mx-auto'>
            wishlist
        </div>
    );
};

export default Wishlist;