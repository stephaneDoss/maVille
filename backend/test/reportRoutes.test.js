const request = require('supertest');
const app = require('../src/app');
const Report = require('../src/models/Report');
const User = require('../src/models/User');

describe('Report Routes', () => {
  let token;
  let reportId;

  beforeAll(async () => {
    // Créer un utilisateur et obtenir un token JWT
    const user = new User({ name: 'Test User', email: 'test@example.com', password: 'password', role: 'citizen' });
    await user.save();
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    token = res.body.token;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Report.deleteMany({});
  });

  it('should create a report', async () => {
    const res = await request(app)
      .post('/api/reports')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Test Report')
      .field('category', 'Infrastructure')
      .field('description', 'Test Description')
      .field('location', 'Test Location')
      .field('latitude', 48.8566)
      .field('longitude', 2.3522)
      .attach('image', 'test/fixtures/test-image.jpg');

    expect(res.status).toBe(201);
    expect(res.body.report).toHaveProperty('_id');
    reportId = res.body.report._id;
  });

  it('should get all reports for the user', async () => {
    const res = await request(app)
      .get('/api/reports')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
  });

  it('should get a report by ID', async () => {
    const res = await request(app)
      .get(`/api/reports/${reportId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', reportId);
  });

  it('should update the status of a report', async () => {
    const res = await request(app)
      .patch(`/api/reports/${reportId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'En cours' });

    expect(res.status).toBe(200);
    expect(res.body.report).toHaveProperty('status', 'En cours');
  });
});