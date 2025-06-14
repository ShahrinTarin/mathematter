import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import WishlistCard from '../Component/WishlistCard';
import EmptyPage from './EmptyPage';
import Loader from '../Component/Loader';


const Wishlist = () => {
    const { user, loading } = use(AuthContext)
    const [loadingWishlist, setLoadingWishlist] = useState(true);
    const [wishlists, setwishlists] = useState([])
    const [deletingItemId, setDeletingItemId] = useState(null);
    useEffect(() => {
        if (!loading) {
            if (!user) {
                Swal.fire({
                    title: "Please Login first",
                    icon: "warning",
                    draggable: true,
                    timer: 1500
                });
                setLoadingWishlist(false);
                return;
            }

            setLoadingWishlist(true);
            axios(`http://localhost:3000/wishlist/${user?.email}`)
                .then(data => {
                    setwishlists(data?.data);
                    setLoadingWishlist(false);
                })
                .catch(err => {
                    console.error("Error fetching wishlist:", err);
                    setLoadingWishlist(false);
                });
        }
    }, [user, loading])

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    setDeletingItemId(_id);
                    setwishlists(prevWishlists => prevWishlists.filter(item => item._id !== _id));
                   axios.delete(`http://localhost:3000/wishlist/${_id}`)
                        .then(data => {
                            if (data.data.deletedCount) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Blog has been deleted from Your Wishlist.",
                                    icon: "success"
                                });
                                setwishlists(prevWishlists => prevWishlists.filter(item => item._id !== _id))
                            }

                        })

                }
            });
    }

    if (loadingWishlist || loading) {
        return <Loader></Loader>;
    }

    return (
        <div className='min-h-[calc(100vh-64px)] py-10 w-11/12 mx-auto'>
            <h1 className='text-4xl font-medium mb-10 text-gray-700 text-center'>Your Wishlist</h1>
            <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {
                    (wishlists.length === 0) ? <EmptyPage></EmptyPage> : wishlists.map(wishlist => <WishlistCard isDeleting={deletingItemId === wishlist._id} handleDelete={handleDelete} key={wishlist._id} wishlist={wishlist}></WishlistCard>)
                }
            </div>
        </div>
    );
};

export default Wishlist;