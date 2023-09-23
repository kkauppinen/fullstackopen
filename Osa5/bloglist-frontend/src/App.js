import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Login from './components/Login';
import Blog from './components/Blog';
import UserDetails from './components/UserDetails';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(undefined);

  useEffect(() => {
    if (user) {
      blogService.getAll(user).then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user');

    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const handleNotification = ({ className, message }) => {
    setNotification({ className, message });
    setTimeout(() => {
      setNotification(undefined);
    }, 3000);
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
          <BlogForm
            setBlogs={setBlogs}
            handleNotification={handleNotification}
          />
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
