'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3001;
const pg = require('pg');
const cors = require('cors');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.get('*', (req, res) => res.status(404).send('This route does not exist'));
app.get('');

app.use(errorHandler);

function errorHandler(error, req, res) {
  console.log('Server Error', error);
  res.status(500).send(error);
}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Your server is listening on ${PORT}`));
  });
