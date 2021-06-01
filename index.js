const express = require('express');
const cors = require('cors');
const { SERVER_PORT } = require('./env');
const mysql = require('./db');

const app = express();

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes')(app)

app.listen(SERVER_PORT, () => {
  console.log(`server listening on : ${SERVER_PORT}`);
});
