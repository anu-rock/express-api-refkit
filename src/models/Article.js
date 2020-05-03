const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [String],
    userId: { type: String, required: true },
    removedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
