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
};
