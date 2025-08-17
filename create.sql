/* CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author VARCHAR(100),
  url TEXT NOT NULL CHECK( url <> '' ),
  title TEXT NOT NULL CHECK( title <> '' ),
  likes INT DEFAULT 0
); */

/* CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL CHECK( name <> '' ),
  username TEXT NOT NULL CHECK( username <> '' ),
  password_hash TEXT,
  updated_at TEXT,
  created_at TEXT
); */
