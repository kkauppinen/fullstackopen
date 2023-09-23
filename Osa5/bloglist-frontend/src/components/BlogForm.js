import { useState } from 'react';
import blogsService from '../services/blogs';

const BlogForm = ({ setBlogs }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogsService.create(blog);
      setBlog({
        title: '',
        author: '',
        url: '',
      });
      setBlogs((blogs) => [...blogs, newBlog]);
    } catch (error) {
      console.log('New blog cannot be added', error);
    }
  };

  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleBlogSubmit}>
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
