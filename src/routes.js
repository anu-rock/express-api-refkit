'use strict';

const indexController = require('./controllers/index');
const UserController = require('./controllers/user');
const AuthController = require('./controllers/auth');
const ArticleController = require('./controllers/article');
const verifyJwt = require('./middleware/verifyJwt');

module.exports = function (app) {
  // Root routes
  app.get('/api', indexController.getRoot);

  // User routes
  app.post('/api/users', UserController.postUser);

  // Auth routes
  app.post('/api/auth', AuthController.postAuth);

  // Article routes
  app.get('/api/articles', verifyJwt, ArticleController.getArticles);
  app.post('/api/articles', verifyJwt, ArticleController.postArticle);
};
