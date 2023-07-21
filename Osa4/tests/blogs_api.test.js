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
});
