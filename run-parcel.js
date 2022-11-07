const Bundler = require('parcel-bundler');
const express = require('express');
console.log(`listening at http://localhost:`);

const bundler = new Bundler([
  'public/game.html',
  'public/index.html',
  'public/await-user.html',
  'public/insert-name.html',
  'public/select-pokemon.html',
  'public/grid.html',
]);
const app = express();

app.get('/', (req, res, next) => {
  req.url = '/index.html';
  app._router.handle(req, res, next);
});

app.use(bundler.middleware());

const port = Number(process.env.PORT) || Number(1234)
app.listen(port);
console.log(`listening at http://localhost:${port}`);