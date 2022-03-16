const express = require('express');
const booksController = require('./controllers/books');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.get('/', (req, res) => {
  res.send('This Works!');
});

app.use('/api/v1/books', booksController);


// require('./controllers/books')
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
