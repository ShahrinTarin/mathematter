import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { FaEye } from 'react-icons/fa6';
import { FaEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../Provider/AuthProvider';

const Register = () => {
  const { createUser, setUser, googleLogIn, updateUser } = useContext(AuthContext);

  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        setError('');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You have been logged in with Google Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state?.from || '/');
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photoURL.value;
    const password = form.password.value;

    // Password validation regexes
    const passDigitExp = /^(?=.*\d)/;
    const passLowerCaseExp = /(?=.*[a-z])/;
    const passUpperCaseExp = /(?=.*[A-Z])/;
    const passLongExp = /.{6,}$/;
    const passSpecialExp = /(?=.*[!@#$%^&*])/;

    if (!passLongExp.test(password)) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!passDigitExp.test(password)) {
      setError('Password must contain at least one digit');
      return;
    }
    if (!passLowerCaseExp.test(password)) {
      setError('Password must contain at least one lowercase letter');
      return;
    }
    if (!passUpperCaseExp.test(password)) {
      setError('Password must contain at least one uppercase letter');
      return;
    }
    if (!passSpecialExp.test(password)) {
      setError('Password must contain at least one special character (!@#$%^&*)');
      return;
    }

    setError('');
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
          })
          .catch((error) => {
            setError(error.message || error.code);
            setUser(user);
          });

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You have been registered successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state?.from || '/');
      })
      .catch((error) => {
        Swal.fire({
          title: 'Oops!',
          text: 'Invalid Credentials',
          icon: 'warning',
          timer: 1500,
        });
        setError(error.code || error.message);
      });
  };

  return (
    <div className="px-3 flex items-center py-10 justify-center min-h-[calc(100vh-64px)] bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="w-full max-w-xl mx-auto p-8 space-y-6 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-2xl transition-colors duration-500">
        <h1 className="text-3xl font-bold text-center">Register Your Account</h1>
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block font-semibold text-gray-900 dark:text-gray-200">
              Name
            </label>
            <input
              required
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#1b9c85] focus:border-transparent
                         dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="photoURL" className="block font-semibold text-gray-900 dark:text-gray-200">
              Photo URL
            </label>
            <input
              required
              type="text"
              name="photoURL"
              id="photoURL"
              placeholder="Photo URL"
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#1b9c85] focus:border-transparent
                         dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block font-semibold text-gray-900 dark:text-gray-200">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#1b9c85] focus:border-transparent
                         dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600"
            />
          </div>

          <div className="space-y-1 text-sm relative">
            <label htmlFor="password" className="block font-semibold text-gray-900 dark:text-gray-200">
              Password
            </label>
            <input
              required
              type={showPass ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#1b9c85] focus:border-transparent
                         dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute top-10 right-4 text-gray-700 dark:text-gray-300 hover:text-[#1b9c85] transition-colors duration-200"
              aria-label={showPass ? 'Hide password' : 'Show password'}
            >
              {showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          <button
            type="submit"
            className="w-full bg-[#1b9c85] hover:bg-green-600 text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Register
          </button>

          <div className="flex items-center w-full my-4">
            <hr className="w-full border-gray-300 dark:border-gray-600" />
            <p className="px-3 text-gray-700 dark:text-gray-400 font-semibold">OR</p>
            <hr className="w-full border-gray-300 dark:border-gray-600" />
          </div>

          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={handleGoogleLogIn}
              className="flex items-center space-x-2 px-5 py-3 border border-gray-300 rounded-md bg-white text-gray-900 hover:bg-gray-100
                         dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              <FcGoogle size={24} />
              <span className="font-semibold">Login with Google</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-700 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="underline font-medium text-[#73c47e] hover:text-green-500 transition-colors duration-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
