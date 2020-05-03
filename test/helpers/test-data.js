'use strict';

module.exports = {
  /* User */
  invalidEmail: 'xyz',
  validEmail: `xyz+${new Date()
    .toISOString()
    .replace(/[\-\.\:]/g, '')}@email.com`,
  existingEmail: 'xyz@email.com',
  invalidPassword: 'abc',
  validPassword: 'Abc123$$',
  // Valid for until May 2030:
  authToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1ZWFlODI4NWQ3NWRjYTAxOWFmMDhlNTYiLCJpYXQiOjE1ODg0OTQ5OTIsImV4cCI6MTkwNDA3MDk5MiwiYXVkIjoiYmxvZ25ldC5jb20iLCJpc3MiOiJhbnVyYWdiaGFuZGFyaS5jb20ifQ.xIy5V8MtRe72XFga5d85c-i5eOqr7JEmIMCaHVxXoWk',

  /* Article */
  articleTitle: 'Hello, friend',
  articleBody: 'Lorem ipsum... bla... bla... bla...',
  articleTags: ['general', 'interesting'],
};
