import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import Loader from '../Component/Loader';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AddBlogs = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [submitting, setSubmitting] = useState(false);

  const handleAddBlog = async (e) => {
    e.preventDefault();

    if (submitting) return; // prevent multiple submits
    setSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);

    // Get the actual long description string from form element
    const longDescription = form.long_description.value.trim();
    const longDescriptionLength = longDescription.length;

    // Time in Dhaka timezone formatted
    const bdTime = new Date().toLocaleString('en-GB', {
      timeZone: 'Asia/Dhaka',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(',', '');

    // Compose new blog object
    const newBlog = {
      ...Object.fromEntries(formData.entries()),
      longDescriptionLength,
      userId: user?.uid || null,
      email: user?.email || null,
      createdAt: bdTime,
    };

    try {
      const { data } = await axiosSecure.post('/blogs', newBlog);

      if (data.insertedId) {
        Swal.fire({
          title: 'Success!',
          text: 'Blog added successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        form.reset();
      } else {
        Swal.fire({
          title: 'Oops!',
          text: 'Failed to add blog. Please try again.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Something went wrong',
        icon: 'error',
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="py-12 w-11/12 mx-auto">
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-5xl font-medium mb-5 text-gray-700 dark:text-gray-200">Add Your Blog</h1>
        </div>

        <form
          onSubmit={handleAddBlog}
          className="bg-transparent rounded-2xl shadow-2xl p-8 lg:w-6/12 mx-auto"
          aria-label="Add new blog form"
        >
          <fieldset className="mb-6">
            <label htmlFor="title" className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              name="title"
              id="title"
              type="text"
              required
              placeholder="Enter Title"
              className="input w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#1b9c85] dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600"
            />
          </fieldset>

          <fieldset className="mb-6">
            <label htmlFor="image" className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              name="image"
              id="image"
              type="url"
              required
              placeholder="Enter photo URL"
              className="input w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#1b9c85] dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600"
            />
          </fieldset>

          <fieldset className="mb-6">
            <label htmlFor="category" className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              name="category"
              id="category"
              required
              className="w-full bg-white p-3 rounded-md border border-gray-300 text-gray-700 appearance-none
                         focus:outline-none focus:ring-2 focus:ring-[#1b9c85] dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
              style={{
                backgroundImage:
                  `url("data:image/svg+xml;utf8,<svg height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 10px center',
                backgroundSize: '1.5em',
              }}
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Astronomy">Astronomy</option>
              <option value="Statistics">Statistics</option>
            </select>
          </fieldset>

          <fieldset className="mb-6">
            <label htmlFor="short_description" className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Short Description
            </label>
            <input
              name="short_description"
              id="short_description"
              type="text"
              required
              placeholder="Enter Short Description"
              className="input w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-[#1b9c85] dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600"
            />
          </fieldset>

          <fieldset className="mb-6">
            <label htmlFor="long_description" className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
              Long Description
            </label>
            <textarea
              name="long_description"
              id="long_description"
              rows="6"
              required
              placeholder="Enter Long Description"
              className="w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-400 resize-none
                         focus:outline-none focus:ring-2 focus:ring-[#1b9c85] dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:border-gray-600"
            ></textarea>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="cursor-pointer px-5 py-3 w-full rounded-md bg-gradient-to-br from-[#1b9c85] to-gray-600 text-white font-semibold
                       shadow-lg transition duration-300 hover:from-[#159972] hover:to-gray-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Adding Blog...' : 'Add Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
