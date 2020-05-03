'use strict';

module.exports = {
  // Messages and strings
  // (may contain markdown text)
  msgInvalidEmail: 'Email is not valid.',
  msgWeakPassword:
    'Password does not match minimum complexity requirements:\n\n' +
    '- 8 characters long\n' +
    '- 1 lowercase character\n' +
    '- 1 uppercase character\n' +
    '- 1 numeric character\n' +
    '- 1 special character out of ! @ # $ % ^ & *',
  msgIncorrectConfirmPassword: 'Passwords do not match.',
  msgUserAlreadyExists: 'User with that email address already exists.',
  msgEmailNotExists: 'No user with given email exists.',
  msgInvalidCredentials: 'Invalid email or password.',
  msgEmptyPassword: 'Password cannot be blank.',
  msgUsingEnvFile: 'Using .env file to supply config environment variables',
  msgUsingEnvExampleFile:
    'Using .env.example file to supply config environment variables',
  msgNoMongoConnectionString:
    'No mongo connection string. Set % environment variable.',
  msgNoJwtSecret: 'No client secret. Set JWT_SECRET environment variable.',
  msgNotAuthorized:
    'You are either not authorized to access this endpoint or have not supplied a valid token.',
  msgNoAuthToken: 'Authorization token is missing.',
  msgEmptyArticleTitle: 'title cannot be blank.',
  msgEmptyArticleBody: 'body cannot be blank.',
  msgInvalidArticleTags: 'tags must be an array of upto 10 strings.',

  // Regular expressions
  regexStrongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  regexAuthHeader: /(Bearer)\s+(\S+)/,
};
