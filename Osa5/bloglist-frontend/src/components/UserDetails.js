import blogsService from '../services/blogs';

const UserDetails = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
    blogsService.setToken(null);
  };

  return (
    <>
      <p>
        User <b>{user.username}</b> has logged in
        <button type="button" onClick={() => handleLogout()}>
          Logout
        </button>
      </p>
    </>
  );
};

export default UserDetails;
