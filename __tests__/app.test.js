const request = require('supertest');
const { rm, mkdir } = require('fs/promises');
const app = require('../lib/app');
const SimpleDb = require('../lib/simple-db');

describe('animals CRUD', () => {
  const rootDir = `${__dirname}/../store`;
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  afterAll(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  it.only('creates a new animal and returns it via POST', async () => {
    const animal = { name: 'mia', age: 1, weight: '30lbs' };
    const res = await request(app).post('/animals').send(animal);
    expect(res.body).toEqual({ ...animal, id: expect.any(String) });
  });
});
