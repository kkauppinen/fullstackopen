import { useState } from 'react';
import loginService from '../services/login';
import blogsService from '../services/blogs';

const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', credentials.username, credentials.password);
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('user', JSON.stringify(user));
      setCredentials({
        username: '',
        password: '',
      });
      setUser(user);
      blogsService.setToken(user.token);
    } catch (error) {
      console.log('login error', error);
    }
  };

  return (
    <>
      <h1>Login to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            value={credentials.username}
            onChange={({ target }) =>
              setCredentials({ ...credentials, username: target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            value={credentials.password}
            onChange={({ target }) =>
              setCredentials({ ...credentials, password: target.value })
            }
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
