CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(100),
  url TEXT NOT NULL CHECK( url <> '' ),
  title TEXT NOT NULL CHECK( title <> '' ),
  likes INT DEFAULT 0
);


INSERT INTO blogs (id, author, url, title, likes) VALUES (1, 'OBAMA', 'somelink', 'american food', 4);
INSERT INTO blogs (id, author, url, title) VALUES (2, 'trump', 'somelink', 'german food');