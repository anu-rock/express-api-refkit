'use strict';

const { check, validationResult } = require('express-validator');

const Article = require('../models/Article');
const logger = require('../util/logger');
const constants = require('../util/constants');

const ArticleController = {
  /**
   * GET /api/articles
   * Returns all articles for current user from database.
   */
  getArticles: (req, res, next) => {
    Article.find({ userId: req.uid }, (err, articles) => {
      if (err) {
        logger.debug(err);
        return next(err);
      }

      return res.json(articles);
    });
  },

  /**
   * POST /api/articles
   * Adds the given article to database.
   */
  postArticle: async (req, res, next) => {
    await check('title', constants.msgEmptyArticleTitle).notEmpty().run(req);
    await check('body', constants.msgEmptyArticleBody).notEmpty().run(req);
    await check('tags', constants.msgInvalidArticleTags)
      .isArray({ min: 0, max: 10 })
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newArticle = new Article({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      userId: req.uid,
    });

    newArticle.save((err, article) => {
      if (err) {
        logger.debug(err);
        return next(err);
      }

      return res.json({
        id: article._id,
        title: article.title,
        body: article.body,
        tags: article.tags || [],
        userId: req.uid,
        createdAt: article.createdAt,
      });
    });
  },
};

module.exports = ArticleController;
