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
import UpdateBlog from "../Pages/UpdateBlog";
import Loader from "../Component/Loader";
import ErrorPage from "../Pages/ErrorPage";
const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayOut,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        loader: () => fetch('https://assignment-11-server-two-drab.vercel.app/recentblogs'),
        hydrateFallbackElement: <Loader></Loader>,
        Component: Home,

      },
      {
        path: '/allblogs',
        Component: AllBlogs,

      },
      {
        path: '/addblog',
        element: <PrivateRoute><AddBlogs></AddBlogs></PrivateRoute>,

      },
      {
        path: '/blogdetails/:id',
        loader: ({ params }) => fetch(`https://assignment-11-server-two-drab.vercel.app/blogs/${params.id}`),
        hydrateFallbackElement: <Loader></Loader>,
        element: <PrivateRoute><BlogDetails></BlogDetails></PrivateRoute>,

      },
      {
        path: '/updateblog/:id',
        loader: ({ params }) => fetch(`https://assignment-11-server-two-drab.vercel.app/blogs/${params.id}`),
        hydrateFallbackElement: <Loader></Loader>,
        element: <UpdateBlog></UpdateBlog>
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
        path: '/featuredblogs',
        Component: FeaturedBlogs,

      },
      {
        path: '/wishlist/:email',
        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>,

      }
    ]

  }
])

export default router