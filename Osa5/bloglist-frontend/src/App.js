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
    if (user) {
      blogsService.getAll(user).then((blogs) => setBlogs(blogs));
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
            <Blog key={blog.id} blog={blog} handleLike={handleLike} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
