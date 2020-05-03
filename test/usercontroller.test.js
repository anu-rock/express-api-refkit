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

const apiUrl = '/api/users';

describe('POST /api/users', () => {
  it('should return 400 when invalid arguments are given', done => {
    request(app)
      .post(apiUrl)
      .send({ email: invalidEmail })
      .expect(400, done);
  });

  it('should return exactly 1 error when invalid email is given', done => {
    request(app)
      .post(apiUrl)
      .send({
        email: invalidEmail,
        password: validPassword,
        confirmPassword: validPassword
      })
      .expect(400)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.errors).toHaveLength(1);
        done();
      });
  });

  it('should return exactly 1 error when invalid password is given', done => {
    request(app)
      .post(apiUrl)
      .send({
        email: validEmail,
        password: invalidPassword,
        confirmPassword: invalidPassword
      })
      .expect(400)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.errors).toHaveLength(1);
        done();
      });
  });

  it('should return 409 when existing email is given', done => {
    request(app)
      .post(apiUrl)
      .send({
        email: existingEmail,
        password: validPassword,
        confirmPassword: validPassword
      })
      .expect(409, done);
  });

  it('should save user when valid arguments are given', done => {
    request(app)
      .post(apiUrl)
      .send({
        email: validEmail,
        password: validPassword,
        confirmPassword: validPassword
      })
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.id).toBeTruthy();
        done();
      });
  });
});
