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

  it('creates a new animal and returns it via POST', async () => {
    const animal = { name: 'mia', age: 1, weight: '30lbs' };
    const res = await request(app).post('/animals').send(animal);
    expect(res.body).toEqual({ ...animal, id: expect.any(String) });
  });

  it('get an animal based on id', async () => {
    const animal = { name: 'mia', age: 1, weight: '30lbs' };
    const res = await request(app).post('/animals').send(animal);
    expect(res.body).toEqual({ ...animal, id: expect.any(String) });
  });

  it('get all', async () => {
    const animal = { name: 'mia', age: 1, weight: '30lbs' };
    await request(app).post('/animals').send(animal);
    const animal2 = { name: 'ellie', age: 2, weight: '9lbs' };
    await request(app).post('/animals').send(animal2);
    const res = await request(app).get('/animals');
    const expected = [
      { ...animal, id: expect.any(String) },
      { ...animal2, id: expect.any(String) },
    ];
    expect(res.body).toEqual(expected);
  });

  it('should PUT an animal with an id', async () => {
    //lines 21 and 22 do again
    const animal = { name: 'mia', age: 1, weight: '30lbs' };
    //update-> save something originally
    const update = { name: 'ellie', age: 2, weight: '9lbs' };
    //res.body.id update by id
    //expect res.body.name = newName
    const res = await request(app).put('/animals/id').send(update);
    expect(res.body).toEqual({ ...update, id: expect.any(String) });
  });

  it('should delete an animal based on id', async () => {
    const animal = { name: 'ellie', age: 2, weight: '9lbs' };
    const posted = await request(app).post('/animals').send(animal);
    const res = await request(app).delete(`/animals/${posted.body.id}`);
    expect(res.statusCode).toEqual(200);
  });
});
