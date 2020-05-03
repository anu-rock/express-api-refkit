'use strict';

const { check, body, validationResult } = require('express-validator');

const User = require('../models/User');
const logger = require('../util/logger');
const constants = require('../util/constants');

const UserController = {
  /**
   * POST /users
   *
   * Creates a new local user account.
   */
  postUser: async (req, res, next) => {
    await check('email', constants.msgInvalidEmail)
      .isEmail()
      .run(req);
    await check('password', constants.msgWeakPassword)
      .matches(constants.regexStrongPassword)
      .run(req);
    await check('confirmPassword', constants.msgIncorrectConfirmPassword)
      .equals(req.body.password)
      .run(req);

    body('email').normalizeEmail({ gmail_remove_dots: false });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (err) {
        logger.debug(err);
        return next(err);
      }
      if (existingUser)
        return res
          .status(409)
          .json({ message: constants.msgUserAlreadyExists });

      newUser.save((err, user) => {
        if (err) {
          logger.debug(err);
          return next(err);
        }

        return res.json({
          id: user._id,
          email: user.email,
          createdAt: user.createdAt
        }); // selectively hiding password
      });
    });
  }
};

module.exports = UserController;
