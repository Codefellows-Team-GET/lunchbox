'use strict';


require('dotenv').config();
const methodOverride = require('method-override');

const express = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3001;
const pg = require('pg');
const cors = require('cors');

// var path = require('path');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));


app.use(cors());

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.get('/', homePageLoad);
app.get('/input', inputPageLoad);
app.get('/results', getRes);
app.get('/about', aboutPageLoad);
app.post('/addRestaurant', addRes);

///Update///
app.use((methodOverride('_method')));
app.get('/update/:id', findDetails);
app.post('/update/:id', showUpdateForm);
app.put('/update/:id', updateRest);

app.get('*', (req, res) => res.status(404).send('This route does not exist'));
app.use(errorHandler);

function homePageLoad(req, res) {
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
        {restaurant: restaurantData})
    })
    .catch(err => console.error('Something went wrong', err))
}

function Restaurant(data) {
  this.name = data.name;
  this.url = data.url;
  this.address = data.location.display_address;
  this.phone - data.display_phone;
}

function findDetails(req, res) {
  let SQL = 'SELECT * FROM saved_res WHERE id=$1;';

  let values = [req.params.id];

  client.query(SQL, values)
    .then((results) => {
      // console.log('this is results in findDetails function', results.rows[0]);
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


function inputPageLoad(req, res) {
  res.render('pages/input', {
    foo: 'Pick your spot =>',
    restaurants:[{name: ''}, {name: ''}]
  });
}

// function resultsPageLoad(req, res) {
//   res.render('./views/pages/results');
// }

function aboutPageLoad(req, res) {
  res.render('pages/about');
}

function errorHandler(error, req, res) {
  console.log('Server Error', error);
  res.status(404).send(error);
}

// Below is the stuff for taking the posted data from the form on the input page, putting the info into the database and taking it from the database to render on the results page.

var lunchbox = [];

// Below is our constructor function.

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

// Below is the function that will take the posted restaraunt data from the form and add it to the database and send the user to the results page.

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

// Below is the function that will get the restaraunt data from the database and render to the results page. 

function getRes(req, res) {
<<<<<<< HEAD
  // console.log('what')
  // console.log('res.body: ', res.body);
  // res.body.resData = {};
=======
  console.log('what')
>>>>>>> 4efb79f2c537d4ddb26951b85aee0b5c3b11e0e6

  let SQL = 'SELECT * from saved_res;';

  return client.query(SQL)
    .then(results => {
      // console.log('get results results', results.rows);
      if( results.rows.length === 0 ) {
        console.log( 'no restaraunts?' )
      } else {
        res.render('pages/results', {results: results.rows})
      }
    })
    .catch(errorHandler);
}


// Below are the functions for sorting lunchbox array based on different clicks on the table headers. They need to be rewritten for EJS

// function sortByWalkTime (event) {
//   lunchbox.sort(function (a, b) {
//     return a.walkTime - b.walkTime;
//   });
//   var lunchboxTableBody = document.getElementById('lunchbox-table-body');
//   lunchboxTableBody.innerHTML = '';
//   for (var i = 0; i <lunchbox.length; i++) {
//     lunchbox[i].render();
//   }
// }

// function sortByWaitTime (event) {
//   lunchbox.sort(function (a, b) {
//     return a.waitTime - b.waitTime;
//   });
//   var lunchboxTableBody = document.getElementById('lunchbox-table-body');
//   lunchboxTableBody.innerHTML = '';
//   for (var i = 0; i <lunchbox.length; i++) {
//     lunchbox[i].render();
//   }
// }

// function sortByTotalTime (event) {
//   lunchbox.sort(function (a, b) {
//     return a.totalTime - b.totalTime;
//   });
//   var lunchboxTableBody = document.getElementById('lunchbox-table-body');
//   lunchboxTableBody.innerHTML = '';
//   for (var i = 0; i <lunchbox.length; i++) {
//     lunchbox[i].render();
//   }
// }

// function sortByPrice (event) {
//   lunchbox.sort(function (a, b) {
//     if (a.price.length > b.price.length) {
//       return 1;
//     }
//     else if (b.price.length > a.price.length) {
//       return -1;
//     }
//   });
//   var lunchboxTableBody = document.getElementById('lunchbox-table-body');
//   lunchboxTableBody.innerHTML = '';
//   for (var i = 0; i <lunchbox.length; i++) {
//     lunchbox[i].render();
//   }
// }

// function sortByRating (event) {
//   lunchbox.sort(function (a, b) {
//     if (a.rating > b.rating) {
//       return 1;
//     }
//     else if (b.rating > a.rating) {
//       return -1;
//     }
//   });

//   var lunchboxTableBody = document.getElementById('lunchbox-table-body');
//   lunchboxTableBody.innerHTML = '';
//   for (var i = 0; i <lunchbox.length; i++) {
//     lunchbox[i].render();
//   }
// }





client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Your server is listening on ${PORT}`));
  });
