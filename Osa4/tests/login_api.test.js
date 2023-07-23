const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('drowssap', 10);
  const user = new User({
    name: 'Simon',
    username: 'theCat',
    password: passwordHash,
  });

  await user.save();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /login', () => {
  test('returns token when valid login details are given', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'theCat', password: 'drowssap' })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.token).toBeDefined();
    expect(response.body.username).toBe('theCat');
    expect(response.body.name).toBe('Simon');
  });

  test('returns error when login details are invalid', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'theCat', password: 'wrong' })
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toEqual({ error: 'invalid username or password' });
  });
});
