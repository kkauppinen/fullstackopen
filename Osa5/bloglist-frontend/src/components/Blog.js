import { useState } from 'react';

const Blog = ({ blog, handleLike }) => {
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
        </>
      )}
    </div>
  );
};

export default Blog;
