import React, { use, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2'
import { FaEye } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';


const Register = () => {
    const { createUser, setUser, googleLogIn, updateUser } = use(AuthContext)


    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const handleGoogleLogIn = () => {
        googleLogIn()
            .then((result) => {
                const user = result.user
                setUser(user)
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

    const handleRegister = (e) => {
        e.preventDefault()
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const photo = form.photoURL.value
        const password = form.password.value
        // const formData = new FormData(form)

        // pass validation
        const passDigitExpresion = /^(?=.*\d)/
        const passLowerCaseExpresion = /(?=.*[a-z])/
        const passUpperCaseExpresion = /(?=.*[A-Z])/
        const passLongExpresion = /.{6,}$/
        const passSpecialExpresion = /(?=.*[!@#$%^&*])/
        if (passLongExpresion.test(password) === false) {
            setError('Password must have 6 digit long')
            return
        }
        else if (passDigitExpresion.test(password) === false) {
            setError('Password must have one Digit')
            return
        }
        else if (passLowerCaseExpresion.test(password) === false) {
            setError('Password must have one Lower Case Letter')
            return
        }
        else if (passUpperCaseExpresion.test(password) === false) {
            setError('Password must have one Upper Case Letter')
            return
        }
        else if (passSpecialExpresion.test(password) === false) {
            setError('Password must have one Special Character Letter')
            return
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo })
                    })
                    .catch((error) => {
                        setError(error)
                        setUser(user)
                    });

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You have been Registered Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch((error) => {
                const errorCode = error.code
                Swal.fire({
                    title: "Ooops!",
                    text: "Invalid Credentials ",
                    icon: "warning",
                    timer: 1500
                });
                setError(errorCode)

            });
    }
    return (


        <div className='px-3 flex items-center py-10 justify-center min-h-[calc(100vh-64px)]'>
            <div className="w-full max-w-xl mx-auto p-8 space-y-3 rounded-xl bg-base-100 text-gray-800 mb-5 shadow-2xl">
                <h1 className="text-2xl font-bold text-center">Register Your Account</h1>
                <form onSubmit={handleRegister} className="space-y-2">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block text-gray-800">Name</label>
                        <input required type="text" name="name" id="Name" placeholder="Name" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="Photo URL" className="block text-gray-800">Photo URL</label>
                        <input required type="text" name="photoURL" id="photoURL" placeholder="Photo URL" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="email" className="block text-gray-800">Email</label>
                        <input required type="email" name="email" id="email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
                    </div>
                    <div className="space-y-1 text-sm relative">
                        <label htmlFor="password" className="block text-gray-800">Password</label>
                        <input required
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="Password"
                            className="w-full mb-3 px-4 py-3  rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600" />
                        <button onClick={() => setShowPass(!showPass)} className='text-gray-700 absolute  top-9 right-4'>{showPass ? <FaEyeSlash size={16}></FaEyeSlash> : <FaEye size={16}></FaEye>}</button>

                    </div>

                    {error && <p className='text-sm text-error'>{error}</p>}

                    <button type='submit' className="block w-full p-3 text-center rounded-sm cursor-pointer text-gray-50 bg-[#1b9c85]">Register</button>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full text-gray-800" />
                        <p className="px-3 text-gray-800">OR</p>
                        <hr className="w-full text-gray-800" />
                    </div>
                    <div className="flex items-center justify-center pt-4 space-x-1">

                        <button onClick={handleGoogleLogIn} className="btn bg-white text-black border-[#e5e5e5]">
                            <FcGoogle size={20}></FcGoogle>
                            Login with Google
                        </button>

                    </div>

                    <p className="text-xs text-center sm:px-6 text-gray-800">Already have an account ?
                        <Link to='/login' rel="noopener noreferrer" className="underline text-lg font-medium text-[#73c47e]">Login</Link>
                    </p>
                </form>
            </div>
        </div>

    );
};

export default Register;