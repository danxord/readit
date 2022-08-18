const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Post = require('./models/post');

mongoose.connect('mongodb://localhost:27017/readit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/makepost', async (req, res) => {
  const post = new Post({
    title: 'My first post!',
    description: 'test description',
  });
  await post.save();
  res.send(post);
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
