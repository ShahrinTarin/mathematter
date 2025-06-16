import axios from "axios";
import { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})


const useAxiosSecure = () => {
    const { user, logOut } = use(AuthContext)
    axiosInstance.interceptors.request.use(async config => {
        if (user?.accessToken) {
            const token = await user.accessToken
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    })

    axiosInstance.interceptors.response.use(response => response,
        err => {
            if (err.response?.status === 401 || err.response?.status === 403) {
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