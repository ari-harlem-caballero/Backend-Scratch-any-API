-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    publish_date INT,
    pages INT
);

INSERT INTO
    books (title, author, publish_date, pages)
VALUES
    ('The Sun Also Rises', 'Ernest Hemingway', 1926, 272),
    ('Braiding Sweetgrass', 'Rabin Wall Kimmerer', 2013, 410);