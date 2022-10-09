import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import livereload from 'livereload';
import connectLiveReload from 'connect-livereload';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
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

const __dirname = dirname(fileURLToPath(import.meta.url));

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(`${__dirname}/public`);
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

const app = express();

app.use(connectLiveReload());

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Home page' });
});

app.get('/posts', async (req, res) => {
  const posts = await Post.find({});
  res.render('posts/index', { posts, title: 'Posts' });
});

app.get('/posts/new', (req, res) => {
  res.render('posts/new', { title: 'Create a post' });
});

app.post('/posts', async (req, res) => {
  const post = new Post(req.body.post);
  await post.save();
  res.redirect(`/posts/${post._id}`);
});

app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('posts/show', { post, title: post.title });
});

app.get('/posts/:id/edit', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('posts/edit', { post, title: 'Edit post' });
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

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
  // express слушает запросы, как в mongodb mongod слушает запросы к базе данных и обрабатывает их
  // mongodb слушает и обрабатывает запросы после выполнения команды mongod в терминале,
  // а express слушает и обрабатывает запросы после запуска скрипта через node app.js в терминале
  // и будет слушать пока принудительно не закончить выполнение скрипта через ctrl+c, как и mongod
});
