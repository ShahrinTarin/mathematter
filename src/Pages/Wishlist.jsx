import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';


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
        <div className='min-h-[calc(100vh-64px)] w-11/12 mx-auto'>
            {
                wishlists.map(wishlist => <p>oijhgg</p>)
            }
        </div>
    );
};

export default Wishlist;