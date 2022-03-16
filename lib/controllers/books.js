const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res) => {
    console.log('reeeeqqqq', req.body);
    const book = { ...req.body };
    res.send(book);
  });
