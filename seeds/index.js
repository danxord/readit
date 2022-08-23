const mongoose = require('mongoose');
const seedPosts = require('./seedPosts');
const Post = require('../models/post');

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
      date: `${seedPosts[i].date}`,
      author: `${seedPosts[i].author}`,
      ups: `${seedPosts[i].ups}`,
      downs: `${seedPosts[i].downs}`,
    });
    await post.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
