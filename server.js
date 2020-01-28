'use strict';

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
  let key = process.env.MAP_API_KEY;
  res.render('pages/index', {
    foo: 'bar',
    map: `https://maps.locationiq.com/v2/staticmap?key=${key}&center=47.618249,-122.351872&zoom=16&size=400x400&markers=icon:small-red-cutout|47.618249,-122.351872`
    // '../../img/GoogleMapTa.jpg'
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

// /// Yelp handler
app.get('/yelp', yelpHandler);

function yelpHandler (req, res) {
  console.log('inside yelp handler');
  let key = process.env.YELP_API_KEY;
  const yelpURL = `https://api.yelp.com/v3/businesses/search?category=restaurants&latitude=47.618249&longitude=-122.351872`;

  superagent
    .get(yelpURL)
    .set('Authorization', `Bearer ${key}`)
    .then(yelpData => {

      let restaurantList = JSON.parse(yelpData.text);
      let restaurantData = restaurantList.businesses.map(thisRestaurantData => {
        return new Restaurant(thisRestaurantData)
      })
      console.log('these are the results:',restaurantData)
      res.render('pages/', {results: restaurantData})
    })
    .catch(err => console.error('Something went wrong', err))
}


function Restaurant(data) {
  this.name = data.name;
  this.url = data.url;
  this.address = data.display_address;
}

/// Map Handler
// app.post('/' , mapHandler);

// function mapHandler (req, res) {
//   let key = process.env.MAP_API_KEY;
//   let latitude = 47.618249;
//   let longitude = -122.351872;
//   let url = `https://maps.locationiq.com/v2/staticmap?${key}?${longitude},${latitude}`
// }



// client.connect()
//   .then(() => {
app.listen(PORT, () => console.log(`Your server is listening on ${PORT}`));
// });
