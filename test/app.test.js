const request = require('supertest');
const app = require('../src/app');

describe('GET /random-url', () => {
  it('should return 404', done => {
    request(app)
      .get('/random-url')
      .expect(404, done);
  });
});

describe('GET /api', () => {
  it('should return a friendly message', done => {
    request(app)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).toBeTruthy();
        done();
      });
  });
});

describe('POST /api', () => {
  it('should return 404', done => {
    request(app)
      .post('/api')
      .field('unnecessary-payload', 'useless data')
      .expect(404, done);
  });
});
