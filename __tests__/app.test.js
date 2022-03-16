const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const Book = require('../lib/models/Book');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  test('creates a book', async () => {
    const expected = {
      title: 'The Sun Also Rises',
      author: 'Ernest Hemingway',
      pubish_date: 1926,
      pages: 272,
    };

    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
