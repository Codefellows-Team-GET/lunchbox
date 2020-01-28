'use strict';

require('dotenv').config();

const express = require('express');
//added
var bodyParser = require('body-parser');
// const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3001;
// const pg = require('pg');
const cors = require('cors');
//added
var path = require('path');
//added
// var expressLayouts = require('express-ejs-layouts');

// const client = new pg.Client(process.env.DATABASE_URL);
// client.on('error', err => console.error(err));

//added all
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
// app.set('views/pages', path.join(__dirname, 'pages'));
// already have app.set('view engine', 'ejs');

//added
// app.get('/', function(req, res){
//   res.render('pages/index', {
//     foo: 'bar',
//     map: '../../img/GoogleMapTa.jpg'


//   });
// })

app.use(cors());
//added
// app.use(expressLayouts);

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
// app.get('');
app.get('/', homePageLoad);
app.get('/input', inputPageLoad);
app.get('/results', resultsPageLoad);
app.get('/about', aboutPageLoad);
app.get('*', (req, res) => res.status(404).send('This route does not exist'));

app.use(errorHandler);

function homePageLoad(req, res) {
  res.render('pages/index', {
    foo: 'bar',
    map: '../../img/GoogleMapTa.jpg'
  });
}

function inputPageLoad(req, res) {
  res.render('pages/input', {
    foo: 'bar',
    restaurants:[{name: '7-11'}, {name: 'subway'}]
  });
}

function resultsPageLoad(req, res) {
  res.render('pages/results');
}

function aboutPageLoad(req, res) {
  res.render('pages/about');
}

function errorHandler(error, req, res) {
  console.log('Server Error', error);
  res.status(500).send(error);
}

// client.connect()
//   .then(() => {
app.listen(PORT, () => console.log(`Your server is listening on ${PORT}`));
// });
