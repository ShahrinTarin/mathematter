import React, { use, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2'
import { FaEye } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {

    const { signIn, setUser, googleLogIn, email, setEmail } = use(AuthContext)

    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const handleGoogleLogIn = () => {
        googleLogIn()
            .then((result) => {
                const user = result.user
                setUser(user)
                setError('')
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have been LogIn with Google Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`${location.state ? location.state : '/'}`)

            })
            .catch((error) => {
                const errorCode = error.code;
                //  const errorMessage = error.message;
                setError(errorCode)
            });
    }

    const handleLogIn = (e) => {
        e.preventDefault()
        const form = e.target
        const password = form.password.value
        const email = form.email.value


        signIn(email, password)
            .then((result) => {
                const user = result.user
                setUser(user)
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have been LogIn Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`${location.state ? location.state : '/'}`)

            })
            .catch((error) => {
                const errorCode = error.code;
                // const errorMessage = error.message;
                setError(errorCode)

            });

    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    return (

        <div>


            <div className='px-3'>
                <div className="w-full max-w-md mx-auto p-8 mt-8 md:mt-16 space-y-3 rounded-xl bg-gray-600 text-gray-100 mb-5 shadow-2xl">

                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <form onSubmit={handleLogIn} className="space-y-2">
                        <div className="space-y-1 text-sm">
                            <label htmlFor="email" className="block text-gray-100">Email</label>
                            <input value={email}
                                onChange={handleEmailChange} required type="email" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
                        </div>
                        <div className="space-y-1 text-sm relative">
                            <label htmlFor="password" className="block text-gray-100">Password</label>
                            <input required
                                type={showPass ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="w-full mb-3 px-4 py-3 cursor-pointer rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
                            <button onClick={() => setShowPass(!showPass)} className='text-gray-700 absolute  top-9 right-4'>{showPass ? <FaEyeSlash size={16}></FaEyeSlash> : <FaEye size={16}></FaEye>}</button>

                        </div>
                        <div className="flex justify-end text-xs text-gray-100">
                            <Link rel="noopener noreferrer" >Forgot Password?</Link>
                        </div>

                        {error && <p className='text-xs text-error'>{error}</p>}

                        <button type='submit' className="block w-full p-3 text-center rounded-sm cursor-pointer text-gray-50 bg-blue-500">Sign in</button>
                        <div className="flex items-center w-full my-4">
                            <hr className="w-full text-gray-100" />
                            <p className="px-3 text-gray-100">OR</p>
                            <hr className="w-full text-gray-100" />
                        </div>
                        <div className="flex items-center justify-center pt-4 space-x-1">

                            <button onClick={handleGoogleLogIn} className="btn bg-white text-black border-[#e5e5e5]">
                                <FcGoogle size={20}></FcGoogle>
                                Login with Google
                            </button>

                        </div>

                        <p className="text-xs text-center sm:px-6 text-gray-100">Don't have an account ?
                            <Link to='/register' rel="noopener noreferrer" className="underline text-lg font-medium text-blue-300"> Register </Link>
                        </p>
                    </form>
                </div>
                </div>
        </div>
    );
};

export default Login;