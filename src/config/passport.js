'use strict';

const passport = require('passport');
const passportLocal = require('passport-local');
const passportJwt = require('passport-jwt');

const User = require('../models/User');
const constants = require('../util/constants');
const logger = require('../util/logger');

const LocalStrategy = passportLocal.Strategy;

/**
 * Sign in using email and password.
 */
passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        logger.debug(err);
        return done(err);
      }
      if (!user) {
        return done(undefined, false, { message: constants.msgEmailNotExists });
      }

      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          logger.debug(err);
          done(err);
        }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, {
          message: constants.msgInvalidCredentials,
        });
      });
    });
  })
);

/**
 * Authorize using JSON Web Tokens.
 * (Status: Not working. Don't use.)
 */
// const jwtOptions = {
//   jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
//   secretOrKey: JWT_SECRET,
//   issuer: process.env.JWT_ISSUER || 'example.com',
//   audience: process.env.JWT_AUDIENCE || 'example.com'
// };
// passport.use(
//   new JwtStrategy(jwtOptions, function(payload, done) {
//     User.findById(payload.uid, function(err, user) {
//       if (err) {
//         logger.debug(err);
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     });
//   })
// );
