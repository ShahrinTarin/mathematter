import axios from "axios";
import { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials:true
})


const useAxiosSecure = () => {
    const {user, logOut } = use(AuthContext)
    axiosInstance.interceptors.request.use(config => {
         if (user?.accessToken) {
            config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config
    })

    axiosInstance.interceptors.response.use(res => res,
        err => {
            if (err.status === 401 || err.status === 403) {
                logOut().then(() => {
                    console.log(`You are Logged Out because of an error with ${err.status} code`)
                })
                    .catch(err => console.log(err))
            }
            return Promise.reject(err)
        }
    )
    return axiosInstance
};

export default useAxiosSecure;