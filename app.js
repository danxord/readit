import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import { Post } from './models/post.js';

mongoose.connect('mongodb://localhost:27017/readit', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});
const __dirname = new URL('.', import.meta.url).pathname.slice(1);
const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}views`);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find({});
  res.render('posts/index', { posts });
});

app.get('/posts/new', (req, res) => {
  res.render('posts/new');
});

app.post('/posts', async (req, res) => {
  const post = new Post(req.body.post);
  await post.save();
  res.redirect(`/posts/${post._id}`);
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('posts/show', { post });
});

app.get('/posts/:id/edit', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('posts/edit', { post });
});

app.put('/posts/:id', async (req, res) => {
  const { id } = req.params; // чтобы сократить длину след. строчки
  const post = await Post.findByIdAndUpdate(id, { ...req.body.post });
  // req.body.post - потому что в хтмл форме обьединение всех полей в обьект post при создании поста
  res.redirect(`/posts/${post._id}`);
});

app.delete('/posts/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/posts');
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
