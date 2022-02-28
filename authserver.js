// express jwt token api
const express = require('express');

// express app object
const app = express();

// require dotenv variables
require('dotenv').config();

// load jsonwebtoken module
const jwt = require('jsonwebtoken');

// create port for jwt token api
const port = 4000;

// array of refresh tokens to be refreshed
let refreshTokens = [];

// express json middleware
app.use(express.json());

// refresh token endpoint
app.post('/token', (req, res, next) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.statusCode(401);
  if (!refreshTokens.includes(refreshToken)) return res.statusCode(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.statusCode(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

// create a refresh token for the user
app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

/*
generate an access token for the given user
Args:
 - user
*/
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCRESS_TOKEN_SECRET, {
    expiresIn: '120s',
  });
}

// listen on the port
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
