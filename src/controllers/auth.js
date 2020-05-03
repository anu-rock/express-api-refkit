'use strict';

const { check, body, validationResult } = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const logger = require('../util/logger');
const constants = require('../util/constants');
const { JWT_SECRET } = require('../util/secrets');
require('../config/passport');

const AuthController = {
  /**
   * POST /api/auth
   * Authenticates the given local user and returns a token on success.
   */
  postAuth: async (req, res, next) => {
    await check('email', constants.msgInvalidEmail).isEmail().run(req);
    await check('password', constants.msgEmptyPassword)
      .isLength({ min: 1 })
      .run(req);

    body('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        logger.debug(err);
        next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      const tokenOptions = {
        expiresIn: '1d', // 1 day; see https://github.com/zeit/ms
        issuer: process.env.JWT_ISSUER || 'example.com',
        audience: process.env.JWT_AUDIENCE || 'example.com',
      };
      const tokenPayload = { uid: user._id };
      const token = jwt.sign(tokenPayload, JWT_SECRET, tokenOptions);

      return res.json({ token });
    })(req, res, next);
  },
};

module.exports = AuthController;
