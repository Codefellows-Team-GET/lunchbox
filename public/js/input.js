'use strict';

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

var formElement = document.getElementById('new-takeout');
formElement.addEventListener('submit', handleFormSubmitted);
