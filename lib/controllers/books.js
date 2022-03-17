const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);

    res.send(book);
  })

  .get('/', async (req, res) => {
    const books = await Book.getAllBooks();

    res.send(books);
  })
  
  .get('/:id', async (req, res, next) => {
    try {
      const book = await Book.getBookById(req.params.id);

      res.send(book);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  })
  
  .patch('/:id', async (req, res) => {
    const book = await Book.updateBook(req.params.id, req.body);

    res.send(book);
  })

  .delete('/:id', async (req, res) => {
    const book = await Book.deleteBook(req.params.id, req.body);

    res.send(book);
  });
