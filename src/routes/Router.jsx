import { createBrowserRouter } from "react-router";
import RootLayOut from "../RootLayOut/RootLayOut";
import Home from "../Pages/Home";
import AllBlogs from "../Pages/AllBlogs";
import AddBlogs from "../Pages/AddBlogs";
import PrivateRoute from "../Provider/PrivateRoute";
import Wishlist from "../Pages/Wishlist";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
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
        path: '/login',
        Component: Login,
      },
       {
        path: '/register',
        Component: Register,
      },
        {
       path:'/featuredblogs' ,
        Component:AddBlogs,

      },
        {
       path:'/wishlist' ,
      element:<PrivateRoute><Wishlist></Wishlist></PrivateRoute>,

      }
    ]

  }
])

export default router