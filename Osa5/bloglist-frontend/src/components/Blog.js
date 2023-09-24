import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShow = () => {
    setShowAll(!showAll);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button type="button" onClick={toggleShow}>
        {showAll ? 'Hide' : 'View'}
      </button>
      {showAll && (
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button type="button" onClick={() => handleLike(blog)}>
              Like!
            </button>
          </div>
          <div>{blog.user.username}</div>
          <button type="button" onClick={() => handleRemove(blog)}>
            Remove
          </button>
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default Blog;
