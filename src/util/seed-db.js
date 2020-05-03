'use strict';

const seeder = require('mongoose-seed');
const { MONGODB_URI } = require('./secrets');

seeder.connect(MONGODB_URI, function () {
  // Load Mongoose models
  seeder.loadModels(['src/models/User.js']);

  // Clear specified collections
  seeder.clearModels(['User'], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});

// Data array containing seed data - documents organized by Model
var data = [
  {
    model: 'User',
    documents: [
      {
        email: 'xyz@email.com',
        password: 'Abc123$$',
      },
    ],
  },
];
