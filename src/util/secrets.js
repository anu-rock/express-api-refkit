'use strict';

const dotenv = require('dotenv');
const fs = require('fs');

const logger = require('./logger');
const constants = require('./constants');

if (fs.existsSync('.env')) {
  logger.debug(constants.msgUsingEnvFile);
  dotenv.config({ path: '.env' });
} else {
  logger.debug(constants.msgUsingEnvExampleFile);
  dotenv.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}

const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production';
const test = ENVIRONMENT === 'test';

const MONGODB_URI = prod
  ? process.env['MONGODB_URI']
  : test
  ? process.env['MONGODB_URI_TEST']
  : process.env['MONGODB_URI_LOCAL'];

if (!MONGODB_URI) {
  if (prod) {
    logger.error(
      constants.msgNoMongoConnectionString.replace('%', 'MONGODB_URI')
    );
  } else if (test) {
    logger.error(
      constants.msgNoMongoConnectionString.replace('%', 'MONGODB_URI_TEST')
    );
  } else {
    logger.error(
      constants.msgNoMongoConnectionString.replace('%', 'MONGODB_URI_LOCAL')
    );
  }
  process.exit(1);
}

const JWT_SECRET = process.env['JWT_SECRET'];

if (!JWT_SECRET) {
  logger.error(constants.msgNoJwtSecret);
  process.exit(1);
}

module.exports = {
  ENVIRONMENT,
  MONGODB_URI,
  JWT_SECRET
};
