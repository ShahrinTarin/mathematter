import { useContext, useEffect, useState } from 'react';
import { NavLink, useLoaderData } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const blog = useLoaderData();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`https://assignment-11-server-two-drab.vercel.app/comment/${blog._id}`)
      .then(({ data }) => {
        setComments(data);
      })
      .catch(console.error);
  }, [user, blog._id]);

  const handleComments = (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        title: 'Please Login first',
        icon: 'warning',
        draggable: true,
        timer: 1500,
      });
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    const commentObj = {
      ...Object.fromEntries(formData.entries()),
      blogId: blog._id,
      userEmail: user?.email,
      userName: user?.displayName,
      userphoto: user?.photoURL,
    };

    axios
      .post(`https://assignment-11-server-two-drab.vercel.app/comment/${blog._id}`, commentObj)
      .then(({ data }) => {
        if (data.insertedId) {
          Swal.fire({
            title: 'Your comment added Successfully!',
            icon: 'success',
            draggable: true,
            timer: 1500,
          });
          form.reset();
          setComments((prev) => [...prev, commentObj]);
        }
      })
      .catch(() => {
        Swal.fire({
          title: 'Failed to add comment',
          icon: 'error',
          timer: 1500,
        });
      });
  };

  const [showFullDescription, setShowFullDescription] = useState(false);
  const WORD_LIMIT = 100;

  const toggleDescription = () => setShowFullDescription((prev) => !prev);

  const getTruncatedDescription = (text) => {
    if (!text) return 'No description available';
    const words = text.trim().split(' ');
    if (words.length <= WORD_LIMIT || showFullDescription) {
      return text;
    }
    return words.slice(0, WORD_LIMIT).join(' ') + '...';
  };

  const displayText = getTruncatedDescription(blog.long_description);

  return (
    <div className="min-h-[calc(100vh-64px)] pb-12 flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="lg:p-10 p-6 w-full max-w-5xl">
        <article className="flex flex-col space-y-6 rounded-lg shadow-md p-6 bg-gray-50 dark:bg-gray-800 dark:text-gray-100">
          {/* Blog Header */}
          <header className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                alt={blog.email}
                src={blog.photourl}
                className="object-cover w-12 h-12 rounded-full shadow-sm dark:bg-gray-700"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{blog.email}</span>
                <time className="text-xs text-gray-500 dark:text-gray-400">{blog.createdAt}</time>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#1b9c85] text-white text-sm font-semibold">
              {blog.category}
            </div>
          </header>

          {/* Blog Content */}
          <section>
            <img
              src={blog.image}
              alt={blog.title}
              className="object-cover w-full mb-6 max-h-96 rounded-md shadow-sm dark:bg-gray-700"
            />
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">{blog.title}</h1>
            <h2 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
              {blog.short_description}
            </h2>
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">
              {displayText}
              {blog.long_description && blog.long_description.trim().split(' ').length > WORD_LIMIT && (
                <button
                  onClick={toggleDescription}
                  className="ml-2 text-[#1b9c85] hover:underline text-xs focus:outline-none focus:ring-1 focus:ring-[#1b9c85]"
                  aria-expanded={showFullDescription}
                >
                  {showFullDescription ? 'See Less' : 'See More'}
                </button>
              )}
            </p>
          </section>

          {/* Update Blog Button */}
          {blog.email === user?.email && (
            <NavLink
              to={`/updateblog/${blog._id}`}
              className="inline-block px-6 py-2 rounded-md bg-[#1b9c85] text-white font-semibold shadow-md hover:bg-gradient-to-r hover:from-[#1b9c85] hover:to-green-400 transition"
            >
              Update Blog
            </NavLink>
          )}
        </article>
      </div>

      {/* Comments Section */}
      <section className="lg:w-1/2 w-full bg-white py-12 rounded-lg shadow-lg px-7 mt-10 border border-gray-200">
  <h2 className="text-3xl font-semibold mb-6 text-gray-800">Comments</h2>

  {blog.email === user?.email ? (
    <p className="text-red-500 text-sm mb-6">
      You can't comment on your own blog
    </p>
  ) : (
    <form onSubmit={handleComments} className="mb-8 space-y-4">
      <div className="flex items-start space-x-4">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full ring-2 ring-[#1b9c85] ring-offset-base-100 ring-offset-2 overflow-hidden">
            <img
              src={user?.photoURL}
              alt={user?.displayName || "User avatar"}
            />
          </div>
        </div>
        <label htmlFor="comment" className="sr-only">
          Write a comment
        </label>
        <textarea
          id="comment"
          name="comment"
          required
          placeholder="Write a comment..."
          className="textarea textarea-accent w-full resize-none bg-gray-50 text-gray-800 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#1b9c85]"
          rows={4}
        ></textarea>
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="inline-block px-6 py-2 rounded-md bg-gradient-to-br from-[#1b9c85] to-green-600 text-white font-semibold shadow-md hover:from-[#159972] hover:to-green-700 transition"
        >
          Comment
        </button>
      </div>
    </form>
  )}

  <p className="text-sm text-[#1b9c85] mb-4">
    {comments.length} people commented on this blog
  </p>

  <div className="space-y-4 max-h-[400px] overflow-auto">
    {comments.map((singleComment) => (
      <article
        key={singleComment._id}
        className="flex items-start gap-4 p-4 rounded-md bg-gray-50 border border-gray-200 shadow-sm"
      >
        <div className="avatar shrink-0">
          <div className="w-10 h-10 rounded-full ring-2 ring-[#1b9c85] ring-offset-base-100 ring-offset-2 overflow-hidden">
            <img
              src={singleComment.userphoto}
              alt={`${singleComment.userName}'s avatar`}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{singleComment.userName}</h3>
          <p className="text-gray-700 whitespace-pre-wrap">
            {singleComment.comment}
          </p>
        </div>
      </article>
    ))}
  </div>
</section>

    </div>
  );
};

export default BlogDetails;
