'use strict';

const request = require('supertest');

const app = require('../src/app');
const {
  invalidEmail,
  validEmail,
  existingEmail,
  invalidPassword,
  validPassword
} = require('./helpers/test-data');

const rootApiUrl = '/api/auth';

describe('POST /api/auth', () => {
  it('should return 400 when invalid arguments are given', done => {
    request(app)
      .post(rootApiUrl)
      .send({ email: invalidEmail })
      .expect(400, done);
  });

  it('should return exactly 1 error when invalid email is given', done => {
    request(app)
      .post(rootApiUrl)
      .send({
        email: invalidEmail,
        password: validPassword
      })
      .expect(400)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.errors).toHaveLength(1);
        done();
      });
  });

  it('should return 401 when invalid credentials are given', done => {
    request(app)
      .post(rootApiUrl)
      .send({
        email: validEmail,
        password: validPassword
      })
      .expect(401, done);
    request(app)
      .post(rootApiUrl)
      .send({
        email: existingEmail,
        password: invalidPassword
      })
      .expect(401, done);
  });

  it('should return token when valid credentials are given', done => {
    request(app)
      .post(rootApiUrl)
      .send({
        email: existingEmail,
        password: validPassword
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.token).toBeTruthy();
        done();
      });
  });
});
