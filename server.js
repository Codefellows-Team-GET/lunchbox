'use strict';

// const Index = require('../js/index.js');
// const Input = require('../js/input.js');
// const Results = require('../js/results.js');

require('dotenv').config();

const express = require('express');
//added
var bodyParser = require('body-parser');
const superagent = require('superagent');
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
// app.post('/addRestaurant', addRes);
app.get('*', (req, res) => res.status(404).send('This route does not exist'));

app.use(errorHandler);

function homePageLoad(req, res) {
  let mapKey = process.env.MAP_API_KEY;
  let yelpKey = process.env.YELP_API_KEY;
  const yelpURL = `https://api.yelp.com/v3/businesses/search?category=restaurants&latitude=47.618249&longitude=-122.351872`;

  superagent.get(yelpURL)
    .set('Authorization', `Bearer ${yelpKey}`)
    .then(yelpData => {

      let restaurantList = JSON.parse(yelpData.text);
      let restaurantData = restaurantList.businesses.map(thisRestaurantData => {
        return new Restaurant(thisRestaurantData)
      })
      res.render( 'pages/index',
        {map: `https://maps.locationiq.com/v2/staticmap?key=${mapKey}&center=47.618249,-122.351872&zoom=16&size=400x400&markers=icon:small-red-cutout|47.618249,-122.351872`,
          restaurant: restaurantData})
    })
    .catch(err => console.error('Something went wrong', err))
}

function Restaurant(data) {
  this.name = data.name;
  this.url = data.url;
  this.address = data.location.display_address;
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

