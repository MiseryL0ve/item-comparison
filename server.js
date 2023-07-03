const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS votes (id INTEGER PRIMARY KEY AUTOINCREMENT, winner INTEGER, loser INTEGER)');
});

app.use(express.static('public'));
app.use(express.json());

app.get('/api/items', (req, res) => {
  db.all('SELECT * FROM items', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/vote', (req, res) => {
  const winner = req.body.winner;
  const loser = req.body.loser;

  db.run('INSERT INTO votes (winner, loser) VALUES (?, ?)', [winner, loser], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.sendStatus(200);
    }
  });
});

app.get('/api/toplist', (req, res) => {
  db.all(`
    SELECT items.name, COUNT(votes.winner) as votesCount
    FROM items
    LEFT JOIN votes ON items.id = votes.winner
    GROUP BY items.name
    ORDER BY votesCount DESC
    LIMIT 15
  `, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
