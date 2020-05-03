'use strict';

const errorhandler = require('errorhandler');
const app = require('./app');

// Error Handler. Provides full stack - remove for production
app.use(errorhandler());

// Start Express server
const server = app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});

module.exports = server;
