import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Login from './components/Login';
import Blog from './components/Blog';
import UserDetails from './components/UserDetails';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

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

  return (
    <div>
      {!user && <Login setUser={setUser} />}
      {user && (
        <>
          <UserDetails user={user} setUser={setUser} />
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
