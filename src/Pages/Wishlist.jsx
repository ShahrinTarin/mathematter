import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import WishlistCard from '../Component/WishlistCard';


const Wishlist = () => {
    const { user } = use(AuthContext)
    const [wishlists, setwishlists] = useState([])
    useEffect(() => {
        if (!user) {
            Swal.fire({
                title: "Please Login first",
                icon: "warning",
                draggable: true,
                timer: 1500
            });
            return;
        }

        axios(`http://localhost:3000/wishlist/${user?.email}`)
            .then(data => {
                setwishlists(data?.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [user])
    
    return (
        <div className='min-h-[calc(100vh-64px)] py-10 w-11/12 mx-auto'>
            <h1 className='text-4xl font-medium mb-10 text-gray-700 text-center'>Your Wishlist</h1>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {
                wishlists.map(wishlist => <WishlistCard key={wishlist._id} wishlist={wishlist}></WishlistCard>)
            }
        </div>
        </div>
    );
};

export default Wishlist;