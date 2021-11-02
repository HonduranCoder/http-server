const parseBody = require('./parse-body.js');
const SimpleDB = require('./simple-db.js');
const db = new SimpleDB(`${__dirname}/../store`);

const animalsRouter = {
  async post(req, res) {
    const animal = await parseBody(req);
    await db.save(animal);
    const savedAnimal = await db.get(animal.id);
    console.log(savedAnimal);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(savedAnimal));
  },
  async get(req, res) {
    const [, , id] = req.url.split('/');

    if (id) {
      const animal = await db.get(id);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(animal));
    } else {
      const animals = await db.getAll();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(animals));
    }
  },
};

module.exports = animalsRouter;
