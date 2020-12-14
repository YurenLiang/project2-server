const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row) {
  return {
    year: row.year,
    month: row.month,
    day: row.day,
    calories_gain: row.calories_gain,
    calories_gain_description: row.calories_gain_description,
    calories_burn: row.calories_burn,
    calories_burn_description: row.calories_burn_description,
  };
}

app.get('/tracker/:month/:day', (request, response) => {
    const query = 'SELECT * FROM tracker WHERE is_deleted = 0 AND month = ? AND day = ? ORDER BY year DESC';
    const params = [request.params.month, request.params.day];
    connection.query(query, params, (error, rows) => {
      response.send({
        ok: true,
        list: rows.map(rowToObject),
      });
    });
});

app.post('/tracker', (request, response) => {
    const query = 'INSERT INTO tracker(year, month, day, calories_gain, calories_gain_description, calories_burn, calories_burn_description) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const params = [request.body.year, request.body.month, request.body.day, request.body.calories_gain, request.body.calories_gain_description, request.body.calories_burn, request.body.calories_burn_description];
    connection.query(query, params, (error, result) => {
      response.send({
        ok: true,
        id: result.insertId,
      });
    });
});

app.patch('/tracker/:id', (request, response) => {
    const query = 'UPDATE tracker SET year = ?, month = ?, day = ?, calories_gain = ?, calories_gain_description = ?, calories_burn = ?, calories_burn_description = ? WHERE id = ?';
    const params = [request.body.year, request.body.month, request.body.day, request.body.calories_gain, request.body.calories_gain_description, request.body.calories_burn, request.body.calories_burn_description, request.params.id];
    connection.query(query, params, (error, result) => {
      response.send({
        ok: true,
      });
    });
});

app.delete('/tracker/:id', (request, response) => {
    const query = 'UPDATE tracker SET is_deleted = 1 WHERE id = ?';
    const params = [request.params.id];
    connection.query(query, params, (error, result) => {
      response.send({
        ok: true,
      });
    });
});

const port = 3444;
app.listen(port, () => {
    console.log(`We're live on port ${port}!`);
});
