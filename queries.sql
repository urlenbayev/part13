ALTER TABLE blogs ADD COLUMN user_id INTEGER;



SELECT b.author AS author, COUNT(*) as articles, SUM(b.likes) AS likes
FROM blogs b
GROUP BY b.author
ORDER BY likes DESC, articles DESC;