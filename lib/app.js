const animalsRouter = require('./animals.js');

const routes = {
  animals: animalsRouter,
};

const app = async (req, res) => {
  //res.end('hi'); ...only for testing connection
  //routes[resource] === routes ['animals] ===routes.animals
  const [, resource] = req.url.split('/');
  const route = routes[resource];

  if (route) {
    //req.method === 'POST' && req.url === '/animals') {
    //route[req.method.toLowerCase()];
    try {
      const routeHandlerFn = route[req.method.toLowerCase()];
      await routeHandlerFn(req, res);
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end(err.message);
    }
  } else {
    res.statusCode = 404;
    res.end(`<html>
  <body>
  <h1> Not Found </h1>
  </body>
  </html>`);
  }
};
module.exports = app;
