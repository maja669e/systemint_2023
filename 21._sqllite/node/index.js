import db from './databse/connection.js'

db.exec(`CREATE TABLE IF NOT EXISTS movies (title, year, score)`);

db.exec(`INSERT INTO movies (title, year, score) VALUES (?, ?, ?)`);

const movies = await db.all(`SELECT * FROM movies`);
console.log(movies);