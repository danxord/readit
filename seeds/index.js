import mongoose from 'mongoose';
import { seedPosts } from './seedPosts.js';
import { Post } from '../models/post.js';

mongoose.connect('mongodb://localhost:27017/readit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const seedDB = async () => {
  await Post.deleteMany({});
  for (let i = 0; i < 5; i++) {
    const post = new Post({
      title: `${seedPosts[i].title}`,
      description: `${seedPosts[i].description}`,
      author: `${seedPosts[i].author}`,
      imageSrc: `${seedPosts[i].imageSrc}`,
      rating: `${seedPosts[i].rating}`,
    });
    await post.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
