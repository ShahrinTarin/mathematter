import { createBrowserRouter } from "react-router";
import RootLayOut from "../RootLayOut/RootLayOut";
import Home from "../Pages/Home";
import AllBlogs from "../Component/AllBlogs";
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

      }
    ]

  }
])

export default router