import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Login from './components/Login';
import Blog from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      blogService.getAll(user).then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  return (
    <div>
      {!user && <Login setUser={setUser} />}
      {user && (
        <>
          <h2>blogs</h2>
          <p>User {user.username} has logged in</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
