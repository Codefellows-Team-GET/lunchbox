'use strict';

// const Server = require('../server.js');
// const Index = require('../js/index.js');
// const Results = require('../js/results.js');

console.log("JS linked");

var lunchbox = [];

// Below is our constructor function.

function Lunchbox(resName, walkTime, waitTime, totalTime, price, rating) {
  this.resName = resName;
  this.walkTime = parseInt(walkTime, 10);
  this.waitTime = parseInt(waitTime, 10);
  this.totalTime = this.walkTime + this.waitTime + this.walkTime;
  this.price = price;
  this.rating = rating;
  lunchbox.push(this);
}

// This is the function that will take in the data entered in the form and put in the constructor function.

function handleFormSubmitted(event) {
  event.preventDefault();
  console.log('event', event);

  var resNameInput = document.getElementById('res-name');
  var resNameValue = resNameInput.value;

  var walkTimeInput = document.getElementById('walk-time');
  var walkTimeValue = walkTimeInput.value;

  var waitTimeInput = document.getElementById('wait-time');
  var waitTimeValue = waitTimeInput.value;

  var totalTimeValue = this.totalTime;

  var priceInput = document.getElementById('price');
  var priceValue = priceInput.value;

  var ratingInput = document.getElementById('rating');
  var ratingValue = ratingInput.value;

  var newLunchbox = new Lunchbox(resNameValue, walkTimeValue, waitTimeValue, totalTimeValue, priceValue, ratingValue);
}

// Below is the function that will add restaraunt data to the database

function addRes(req, res) {
  let { name, walk, wait, total, price, rating } = req.body;

  let SQL = 'INSERT INTO saved_res(name, walk, wait, total, price, rating) VALUES ($1, $2, $3, $4, $5, $6);';
  let values = [name, walk, wait, total, price, rating];

  return client.query(SQL, values)
    .then(res.redirect('/results'))
    .catch(err => errorHandler(err, res));
}

var formElement = document.getElementById('new-lunchbox');
formElement.addEventListener('submit', handleFormSubmitted);
