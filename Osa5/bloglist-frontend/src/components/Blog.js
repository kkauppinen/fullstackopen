import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLike, handleRemove, showRemove }) => {
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
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button type="button" onClick={toggleShow}>
        {showAll ? 'Hide' : 'View'}
      </button>
      {showAll && (
        <>
          <div>{blog.url}</div>
          <div>
            <div>{blog.likes}</div>
            <button type="button" onClick={() => handleLike(blog)}>
              Like!
            </button>
          </div>
          <div>{blog.user.username}</div>
          {showRemove && (
            <button type="button" onClick={() => handleRemove(blog)}>
              Remove
            </button>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func,
  handleRemove: PropTypes.func,
};

export default Blog;
