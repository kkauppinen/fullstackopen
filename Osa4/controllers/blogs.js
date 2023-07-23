const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  } catch (error) {
    next(error);
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes ?? 0,
    user: user._id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id.toString());
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const data = request.body;
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, data, {
      new: true,
    });
    response.json(updated);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
