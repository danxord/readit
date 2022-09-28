import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  description: String,
  date: { type: String, default: Date.now },
  imageSrc: { type: String, default: '' },
  author: String,
  rating: { type: Number, default: 0 },
});

export const Post = mongoose.model('Post', PostSchema);
