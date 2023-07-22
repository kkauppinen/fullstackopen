const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');
const helper = require('./utils/test_helper');

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('password', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /users', () => {
  test('returns all existing users', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(1);
  });
});

describe('POST /users', () => {
  test('can create new user', async () => {
    const existingUsers = await helper.usersInDb();
    const newUser = {
      name: 'Simon',
      username: 'theCat',
      password: 'drowssap',
    };

    const response = await api.post('/api/users').send(newUser).expect(201);
    const allUsers = await helper.usersInDb();

    expect(response.body.password).not.toBeDefined();
    expect(allUsers).toHaveLength(existingUsers.length + 1);

    const usernames = allUsers.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('cannot create new user if username is too short', async () => {
    const existingUsers = await helper.usersInDb();
    const newUser = {
      name: 'Simon',
      username: 'Si',
      password: 'drowssap',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    const allUsers = await helper.usersInDb();

    expect(response.body.error).toBeDefined();
    expect(allUsers).toHaveLength(existingUsers.length);
  });

  test('cannot create new user if password is too short', async () => {
    const existingUsers = await helper.usersInDb();
    const newUser = {
      name: 'Simon',
      username: 'theCat',
      password: 'si',
    };

    const response = await api.post('/api/users').send(newUser).expect(400);
    const allUsers = await helper.usersInDb();

    expect(response.body).toEqual({ error: 'invalid user details' });
    expect(allUsers).toHaveLength(existingUsers.length);
  });
});
