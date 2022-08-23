const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  description: String,
  date: String,
  author: String,
  ups: { type: Number, default: 0 },
  downs: { type: Number, default: 0 },
});

module.exports = mongoose.model('Post', PostSchema);
