const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const helper = require('./utils/test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /blogs', () => {
  test('returns all existing blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(helper.initialBlogs.length);
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('POST /blogs', () => {
  test('can add new blog', async () => {
    const data = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 2,
    };

    const response = await api.post('/api/blogs').send(data).expect(201);

    expect(response.body.id).toBeDefined();
    const expectedBlogs = await helper.blogsInDb();
    expect(expectedBlogs.length).toBe(helper.initialBlogs.length + 1);
  });

  test('likes are set to zero if not defined', async () => {
    const data = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
    };

    const response = await api.post('/api/blogs').send(data).expect(201);

    expect(response.body.likes).toBe(0);
  });

  test('blog cannot be saved without title', async () => {
    const data = {
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 1,
    };

    await api.post('/api/blogs').send(data).expect(400);

    const expectedBlogs = await helper.blogsInDb();
    expect(expectedBlogs.length).toBe(helper.initialBlogs.length);
  });

  test('blog cannot be saved without url', async () => {
    const data = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 1,
    };

    await api.post('/api/blogs').send(data).expect(400);

    const expectedBlogs = await helper.blogsInDb();
    expect(expectedBlogs.length).toBe(helper.initialBlogs.length);
  });
});

describe('DELETE /:id', () => {
  test('existing blog can be deleted', async () => {
    const initialBlogs = await helper.blogsInDb();
    const deletedBlog = initialBlogs[0];

    await api.delete(`/api/blogs/${deletedBlog.id}`).expect(204);

    const expectedBlogs = await helper.blogsInDb();
    const titles = expectedBlogs.map(({ title }) => title);

    expect(expectedBlogs.length).toBe(helper.initialBlogs.length - 1);
    expect(titles).not.toContain(deletedBlog.title);
  });
});

describe('PUT /:id', () => {
  test('existing blog can be updated', async () => {
    const initialBlogs = await helper.blogsInDb();
    const updatedBlog = initialBlogs[0];

    const response = await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send({ ...updatedBlog, likes: 5 })
      .expect(200);

    expect(response.body.likes).toBe(5);
  });
});
