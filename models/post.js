import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  description: String,
  date: { type: String, default: Date.now },
  imageSrc: { type: String, default: '' },
  author: String,
  ups: { type: Number, default: 0 },
  downs: { type: Number, default: 0 },
});

export const Post = mongoose.model('Post', PostSchema);
