const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Auth Routes', () => {
  afterAll(async () => {
    await User.deleteMany({});
  });

  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password', role: 'citizen' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Utilisateur créé avec succès');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});