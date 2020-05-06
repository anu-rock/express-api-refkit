'use strict';

const request = require('supertest');

const app = require('../src/app');
const {
  existingEmail,
  validPassword,
  articleTitle,
  articleBody,
  articleTags,
} = require('./helpers/test-data');

const apiUrl = '/api/articles';
let authToken = '';

/**
 * Generates a JWT auth token that will be used for authorization in tests.
 */
async function generateAuthToken() {
  return request(app).post('/api/auth').send({
    email: existingEmail,
    password: validPassword,
  });
}

/**
 * Do this before executing any test.
 */
beforeAll(async () => {
  const res = await generateAuthToken();
  authToken = res.body.token;
});

/**
 * T H E  T E S T   S U I T E
 */
describe('POST /api/articles', () => {
  it('should return 401 when auth token is given', (done) => {
    request(app).post(apiUrl).expect(401, done);
  });

  it('should return 400 when no arguments are given', (done) => {
    request(app)
      .post(apiUrl)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400, done);
  });

  it('should return exactly 1 error when blank title is given', (done) => {
    request(app)
      .post(apiUrl)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: '',
        body: articleBody,
        tags: [],
      })
      .expect(400)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.errors).toHaveLength(1);
        done();
      });
  });

  it('should return exactly 1 error when blank body is given', (done) => {
    request(app)
      .post(apiUrl)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: articleTitle,
        body: '',
        tags: [],
      })
      .expect(400)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.errors).toHaveLength(1);
        done();
      });
  });

  it('should return exactly 1 error when invalid tags are given', (done) => {
    request(app)
      .post(apiUrl)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: articleTitle,
        body: articleBody,
        tags: 'haha',
      })
      .expect(400)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.errors).toHaveLength(1);
        done();
      });
  });

  it('should return exactly 2 errors when given title and body are blank', (done) => {
    request(app)
      .post(apiUrl)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: '',
        body: '',
        tags: [],
      })
      .expect(400)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.errors).toHaveLength(2);
        done();
      });
  });

  it('should save article when valid arguments are given', (done) => {
    request(app)
      .post(apiUrl)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: articleTitle,
        body: articleBody,
        tags: articleTags,
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.id).toBeTruthy();
        done();
      });
  });
});

describe('GET /api/articles', () => {
  it('should return 401 when auth token is given', (done) => {
    request(app).get(apiUrl).expect(401, done);
  });

  it('should return articles for current user', (done) => {
    request(app)
      .get(apiUrl)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).not.toHaveLength(0);
        done();
      });
  });
});
