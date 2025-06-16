import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import WishlistCard from '../Component/WishlistCard';
import EmptyPage from './EmptyPage';
import Loader from '../Component/Loader';
import useAxiosSecure from '../hooks/useAxiosSecure';


const Wishlist = () => {
    const { user, loading } = use(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [loadingWishlist, setLoadingWishlist] = useState(true)
    const [wishlists, setwishlists] = useState([])
    const [deletingItemId, setDeletingItemId] = useState(null)
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
            axiosSecure(`/wishlist/${user?.email}`)
                .then(data => {
                    setwishlists(data?.data);
                    setLoadingWishlist(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoadingWishlist(false);
                });
        }
    }, [user, loading, axiosSecure,setLoadingWishlist])

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setDeletingItemId(_id);
                axiosSecure.delete(`/wishlist/${_id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            setwishlists(prev => prev.filter(item => item._id !== _id));
                            Swal.fire("Deleted!", "Blog removed from wishlist.", "success");
                        }
                    })
                    .catch((err) => {
                        console.error("Delete failed:", err.response?.data || err.message);
                        Swal.fire("Error", "Failed to delete item.", "error");
                    });
            }
        });
    };

    if (loadingWishlist || loading) {
        return <Loader></Loader>;
    }

    return (
        <div className='min-h-[calc(100vh-64px)] py-10 w-11/12 mx-auto'>
            <h1 className='text-4xl font-medium mb-10 text-gray-700 text-center'>Your Wishlist</h1>
            <div className=' grid grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {
                    (wishlists.length === 0) ? <EmptyPage></EmptyPage> : wishlists.map(wishlist => <WishlistCard isDeleting={deletingItemId === wishlist._id} handleDelete={handleDelete} key={wishlist._id} wishlist={wishlist}></WishlistCard>)
                }
            </div>
        </div>
    );
};

export default Wishlist;