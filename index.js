const express = require('express');
const cors = require('cors');
const { SERVER_PORT } = require('./env');
const mysql = require('./db');

const app = express();

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users/', async (req, res) => {
  try {
    const data = await mysql.query('SELECT * FROM user');
    res.status(200).json(data[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal server error');
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const data = await mysql.query('SELECT * FROM user WHERE id = ?', req.params.id);
    res.status(200).json(data[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal server error');
  }
});

app.post('/users/', async (req, res) => {
  try {
    const data = await mysql.query('INSERT INTO user SET ?', req.body);
    const result = await mysql.query('SELECT * FROM user WHERE id = ?', data.insertId)
    res.status(201).json(result[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal server error');
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await mysql.query('DELETE FROM user WHERE id = ?', req.params.id);
    res.status(204);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal server error');
  }
});
app.put('/users/:id', async (req, res) => {
  try {
    await mysql.query('UPDATE user SET ? WHERE id = ?', [req.params.id, req.body]);
    const result = await mysql.query('SELECT * FROM user WHERE id = ?', data.insertId)
    res.status(201).json(result[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal server error');
  }
});

app.listen(SERVER_PORT, () => {
  console.log(`server listening on : ${SERVER_PORT}`);
});
