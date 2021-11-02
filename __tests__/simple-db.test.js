const { rm, mkdir } = require('fs/promises');
const SimpleDb = require('../lib/simple-db.js');

describe('simple db', () => {
  const rootDir = `${__dirname}/store`;
  beforeEach(async () => {
    await rm(rootDir, { force: true, recursive: true });
    await mkdir(rootDir, { recursive: true });
  });

  afterAll(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  it('saved object with id', async () => {
    const db = new SimpleDb(rootDir);
    const echo = { name: 'echo', type: 'sugar' };
    await db.save(echo);
    expect(echo.id).toEqual(expect.any(String));
  });

  it('save and get', async () => {
    const db = new SimpleDb(rootDir);

    const echo = { name: 'echo', type: 'sugar' };
    await db.save(echo);
    const got = await db.get(echo.id);
    expect(got).toEqual(echo);
  });

  it('returns null for non-existant id', async () => {
    const db = new SimpleDb(rootDir);

    const got = await db.get('non-existant');
    expect(got).toBeNull();
  });

  it('gets all objects', async () => {
    const animals = [
      { name: 'mia', type: 'dog' },
      { name: 'echo', type: 'sugar' },
      { name: 'ellie', type: 'dog' },
    ];

    const db = new SimpleDb(rootDir);

    await Promise.all(animals.map((animal) => db.save(animal)));
    const got = await db.getAll();
    expect(got).toEqual(expect.arrayContaining(animals));
  });

  it('deletes an object', async () => {
    const db = new SimpleDb(rootDir);

    const echo = { name: 'echo', type: 'sugar' };

    await db.save(echo);
    await db.delete(echo.id);
    const got = await db.get(echo.id);
    expect(got).toBeNull();
  });

  it('updates an object', async () => {
    const db = new SimpleDb(rootDir);

    const echo = { name: 'echo', type: 'sugar' };
    await db.save(echo);

    echo.type = 'glider';
    await db.update(echo);

    const got = await db.get(echo.id);
    expect(got).toEqual(echo);
  });
});
