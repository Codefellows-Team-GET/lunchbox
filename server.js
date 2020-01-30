'use strict';


require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3001;
const pg = require('pg');
const cors = require('cors');
const methodOverride = require('method-override');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Routes //

app.get('/', homePageLoad);
app.get('/about', aboutPageLoad);

// Adding //
app.get('/input', inputPageLoad);
app.post('/addRestaurant', addRes);
app.get('/results', getRes);

///Update///
app.use((methodOverride('_method')));
app.get('/update/:id', findDetails);
app.post('/update/:id', showUpdateForm);
app.put('/update/:id', updateRest);

///Sort///
app.get('/sort/:id', sortRest);

///Errors///
app.get('*', (req, res) => res.status(404).send('This route does not exist'));
app.use(errorHandler);

// Below is our function for loading the homepage including APIs //

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
  this.phone - data.display_phone;
}

// Below is the function for loading the input page. //

function inputPageLoad(req, res) {
  res.render('pages/input', {
    foo: 'Pick your spot =>',
    restaurants:[{name: ''}, {name: ''}]
  });
}

// Below is the function for loading the about page. //


function aboutPageLoad(req, res) {
  res.render('pages/about');
}

// Below is our error handler. //

function errorHandler(error, req, res) {
  console.log('Server Error', error);
  res.status(500).send(error);
}

// Below functions for taking the posted data from the form on the input page, putting the info into the database and taking it from the database to render on the results page. //

var lunchbox = [];

// Below is our constructor function. //

function Lunchbox(userName, resName, walkTime, waitTime, price, rating) {
  this.userName = userName;
  this.resName = resName;
  this.walkTime = parseInt(walkTime, 10);
  this.waitTime = parseInt(waitTime, 10);
  this.totalTime = this.walkTime + this.waitTime + this.walkTime;
  this.price = price;
  this.rating = rating;
  lunchbox.push(this);
}

// Below is the function that will take the posted restaraunt data from the form and add it to the database and send the user to the results page. //

function addRes(req, res) {
  console.log(req.body, 'this is req.body');
  let { userName, resName, walkTime, waitTime, price, rating } = req.body;
  var test = new Lunchbox (userName, resName, walkTime, waitTime, price, rating)
  console.log(test, 'this is a new Lunchbox');

  let SQL = 'INSERT INTO saved_res(userName, resName, walkTime, waitTime, totalTime, price, rating) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  let values = [userName, resName, walkTime, waitTime, test.totalTime, price, rating];

  return client.query(SQL, values)
    .then(res.redirect('/results'))
    .catch(err => errorHandler(err, res));
}

// Below is the function that will get the restaraunt data from the database and render to the results page. //

function getRes(req, res) {

  let SQL = 'SELECT * from saved_res;';

  return client.query(SQL)
    .then(results => {
      console.log('get results results', results.rows);
      if( results.rows.length === 0 ) {
        console.log( 'no restaraunts?' )
      } else {
        res.render('pages/results', {results: results.rows})
      }
    })
    .catch(errorHandler);
}

// Below are the functions for updating database entries. //

function findDetails(req, res) {
  let SQL = 'SELECT * FROM saved_res WHERE id=$1;';

  let values = [req.params.id];

  client.query(SQL, values)
    .then((results) => {

      res.render('pages/update.ejs', {results: results.rows[0]})
    })
    .catch(err => errorHandler(err, res));
}

function showUpdateForm(req, res) {
  console.log('you are redirecting to update form')
  res.status(200).render('pages/update.ejs');
}

function updateRest(req, res) {
  console.log(req.params.id);
  console.log('updating form')
  let { userName, resName, walkTime, waitTime, price, rating } = req.body;

  let SQL = `UPDATE saved_res SET userName=$1, resName=$2, walkTime=$3, totalTime=$4, waitTime=$5, price=$6, rating =$7 WHERE id=$8;`;

  let newValues = [userName, resName, walkTime, waitTime, 20 , price, rating, req.params.id];

  return client.query(SQL, newValues)
    .then(res.redirect('/results'))
    .catch(err => errorHandler(err, res));
}

// Below is the function for sorting the lunchbox results table based on different clicks on the table headers. //

function sortRest(req, res) {
  console.log('Hi from sortRest')
  let SQL = 'SELECT * FROM saved_res ORDER BY $1 [ASC | DESC];';

  let values = [req.params.id];

  client.query(SQL, values)
  return client.query(SQL, values)
    .then(results => {
      console.log('hi from response render');
      res.render('pages/results', {results: results.rows})
    })
    .catch(err => errorHandler(err, res));
}


client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Your server is listening on ${PORT}`));
  });
