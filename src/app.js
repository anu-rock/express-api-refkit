'use strict';

const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const secrets = require('./util/secrets');
const logger = require('./util/logger');

// Create Express server
const app = express();

// Configure Express server
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
const mongoUrl = secrets.MONGODB_URI;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    const dbName = mongoUrl
      .split('/')
      .slice(-1)
      .toString();
    logger.debug(`MongoDB connection established to ${dbName}.`);
  })
  .catch(err => {
    logger.debug(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    );
    // process.exit();
  });

// Import routes
require('./routes')(app);

module.exports = app;
