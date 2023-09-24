import { useState } from 'react';

const BlogForm = ({ handleCreate }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreate(blog);
    setBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            value={blog.author}
            onChange={({ target }) =>
              setBlog({ ...blog, author: target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            value={blog.title}
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input
            id="url"
            value={blog.url}
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default BlogForm;
