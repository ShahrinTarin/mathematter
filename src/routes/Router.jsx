import { createBrowserRouter } from "react-router";
import RootLayOut from "../RootLayOut/RootLayOut";
import Home from "../Pages/Home";
import AllBlogs from "../Pages/AllBlogs";
import AddBlogs from "../Pages/AddBlogs";
import PrivateRoute from "../Provider/PrivateRoute";
import Wishlist from "../Pages/Wishlist";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import FeaturedBlogs from "../Pages/FeaturedBlogs";
import BlogDetails from "../Pages/BlogDetails";
const router = createBrowserRouter([
  {
    path: '/',
    Component:RootLayOut,
    children:[
      {
        index:true,
        Component:Home,

      },
        {
       path:'/allblogs' ,
        Component:AllBlogs,

      },
        {
       path:'/addblog' ,
       element:<PrivateRoute><AddBlogs></AddBlogs></PrivateRoute>,

      },
        {
       path:'/blogdetails/:id' ,
       loader: ({ params }) => fetch(`http://localhost:3000/blogs/${params.id}`),
       element:<PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>,

      },
       {
        path: '/login',
        Component: Login,
      },
       {
        path: '/register',
        Component: Register,
      },
        {
       path:'/featuredblogs' ,
        Component:FeaturedBlogs,

      },
        {
       path:'/wishlist' ,
      element:<PrivateRoute><Wishlist></Wishlist></PrivateRoute>,

      }
    ]

  }
])

export default router