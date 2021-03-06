const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  author;
  date;
  pages;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.date = row.publish_date;
    this.pages = row.pages;
  }

  static async insert({
    title,
    author,
    date,
    pages
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        books (title, author, publish_date, pages)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        *
      `,
      [title, author, date, pages]
    );

    return new Book(rows[0]);
  }

  static async getAllBooks() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        books
      `
    );

    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        books
      WHERE
        id=$1
      `,
      [id]
    );
    
    return new Book(rows[0]);
  }

  static async updateBook(id, attributes) {
    const currentBook = await Book.getBookById(id);

    const updatedBook = { ...currentBook, ...attributes };

    const { title, author, date, pages } = updatedBook;
    
    const { rows } = await pool.query(
      `
      UPDATE
        books
      SET
        title=$1,
        author=$2,
        publish_date=$3,
        pages=$4
      WHERE
        id=$5
      RETURNING
        *
      `,
      [title, author, date, pages, id]
    );

    if (!rows[0]) return null;
    return new Book(rows[0]);
  }

  static async deleteBook(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        books
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Book(rows[0]);
  }
};
