const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a book', async () => {
    const expected = 
    {
      title: 'The Sun Also Rises',
      author: 'Ernest Hemingway',
      date: 1926,
      pages: 272,
    };

    const res = await request(app)
      .post('/api/v1/books')
      .send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of books', async () => {
    const expected = await Book.getAllBooks();

    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual(expected);
  });

  it('gets single book based on ID', async () => {
    const expected = await Book.getBookById(1);

    const res = await request(app).get(`/api/v1/books/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('should update a book based on ID', async () => {
    const book = await Book.insert({ title: 'Mine', author: 'Yours' });
    const res = await request(app)
      .patch(`/api/v1/books/${book.id}`)
      .send({ title: 'Memy', author: 2, date: 2000, pages: 100, });

    const expected = {
      id: expect.any(String),
      title: 'Memy',
      author: 2,
      date: 2000,
      pages: 100,
    };

    expect(res.body).toEqual(expected);
    expect(await Book.getBookById(book.id)).toEqual(expected);
  });

  it('should delete single book based on ID', async () => {
    const expected = await Book.getBookById(1);
    
    const res = await request(app)
      .delete(`/api/v1/books/${expected.id}`);

    expect(res.body).toEqual(expected);
  });
});
