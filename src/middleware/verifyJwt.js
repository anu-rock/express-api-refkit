'use strict';

const jwt = require('jsonwebtoken');

const logger = require('../util/logger');
const constants = require('../util/constants');
const { JWT_SECRET } = require('../util/secrets');

/**
 * Verifies JWT token received in request auth header.
 * On successful verification, token is decoded and `uid` added to req object.
 */
function verifyJwt(req, res, next) {
  const authHeader = req.headers.authorization;
  let token = '';
  if (authHeader) {
    const matches = authHeader.match(constants.regexAuthHeader);
    if (matches) {
      token = matches[2];
    }
  }
  if (!token) {
    return res.status(401).json({ error: constants.msgNoAuthToken });
  }

  jwt.verify(
    token,
    JWT_SECRET,
    {
      issuer: process.env.JWT_ISSUER || 'example.com',
      audience: process.env.JWT_AUDIENCE || 'example.com',
    },
    (err, payload) => {
      if (err) {
        logger.debug(err);
        next(err);
      }

      req.uid = payload.uid;
      next();
    }
  );

  /**
   * Authorize using JSON Web Tokens.
   *
   * (Status: Not working. Don't use.)
   * Passport's JWT strategy doesn't seem to work:
   *perhaps this is because the jwt package is no longer maintained.
   */
  //   passport.authenticate('jwt', { session: false }, (err, user) => {
  //     if (err) {
  //       logger.debug(err);
  //       return next(err);
  //     }
  //     if (!user) {
  //       return res.status(401).json({ message: constants.msgNotAuthorized });
  //     }

  //     return res.json({ message: 'Hurray! You hit the jackot.' });
  //   });
}
module.exports = verifyJwt;
