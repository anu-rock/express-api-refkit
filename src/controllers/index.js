'use strict';

const indexController = {
  /**
   * GET /api
   * A playful message.
   */
  getRoot: (req, res) => {
    res.json({ message: 'It works, baby!' });
  }
};

module.exports = indexController;
