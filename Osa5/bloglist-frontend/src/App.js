import { useState, useEffect } from 'react';
import blogsService from './services/blogs';
import Login from './components/Login';
import Blog from './components/Blog';
import UserDetails from './components/UserDetails';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(undefined);

  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await blogsService.getAll(user);
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    }
    if (user) {
      fetchBlogs();
    }
  }, [user]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user');

    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      blogsService.setToken(parsedUser.token);
    }
  }, []);

  const handleNotification = ({ className, message }) => {
    setNotification({ className, message });
    setTimeout(() => {
      setNotification(undefined);
    }, 3000);
  };

  const handleLike = async (blog) => {
    const data = {
      ...blog,
      likes: blog.likes + 1,
      id: undefined,
      user: blog.user._id,
    };
    try {
      const updatedBlog = await blogsService.update(blog.id, data);
      const updatedBlogs = blogs.map((b) =>
        b.id !== blog.id ? b : updatedBlog
      );
      setBlogs(updatedBlogs);
    } catch (error) {}
  };

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogsService.remove(blog.id);
        handleNotification({
          className: 'success',
          message: 'Blog is successfully removed',
        });
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.log('Error removing blog');
        handleNotification({
          className: 'error',
          message: 'Could not remove blog',
        });
      }
    }
  };

  return (
    <div>
      {!user && (
        <Login setUser={setUser} handleNotification={handleNotification} />
      )}
      {user && (
        <>
          {notification && (
            <Notification
              className={notification.className}
              message={notification.message}
            />
          )}
          <UserDetails user={user} setUser={setUser} />
          <Togglable buttonLabel="Add blog">
            <BlogForm
              setBlogs={setBlogs}
              handleNotification={handleNotification}
            />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleRemove={handleRemove}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
