const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

const port = 3000;

app.use(express.json());

require('dotenv').config();

// array of posts
const posts = [
  {
    username: 'ohboy',
    title: 'I am ohboy',
  },
  {
    username: 'ohboy',
    title: 'I am ohboy2',
  },
  {
    username: 'ashif',
    title: 'i am ashif',
  },
  {
    username: 'ashif',
    title: 'i am ashif2',
  },
  {
    username: 'ashif',
    title: 'i am ashif3',
  },
  {
    username: 'amit',
    title: 'i am amit',
  },
  {
    username: 'amit',
    title: 'i am amit2',
  },
  {
    username: 'amit',
    title: 'i am amit3',
  },
  {
    username: 'rewati',
    title: 'i am rewati',
  },
  {
    username: 'rewati',
    title: 'i am rewati here',
  },
  {
    username: 'rewati',
    title: 'i am rewati2 here',
  },
];

// get post authentication token
app.get('/post', authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

/*
helper function to authenticate a jwt token
Args:
 - req, res, next
*/

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401).send(console.log('error 401'));

  // verifies secret accress token
  jwt.verify(token, process.env.ACCRESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.json({
        error: err,
      });
    req.user = user;
    console.log(req.user);
    next();
  });
}

// listen on the port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
