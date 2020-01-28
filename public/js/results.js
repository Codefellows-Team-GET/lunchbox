'use strict';

console.log("JS linked");

Lunchbox.prototype.render = function() {
  var lunchboxTableBody = document.getElementById('lunchbox-table-body');

  var lunchboxRow = document.createElement('tr');

  var userNameCell = document.createElement('td');
  var userNameCap = this.userName[0].toUpperCase() + this.userName.slice(1).toLowerCase();
  userNameCell.textContent = userNameCap;
  lunchboxRow.appendChild(userNameCell);

  var resNameCell = document.createElement('td');
  resNameCell.textContent = this.resName;
  lunchboxRow.appendChild(resNameCell);

  var walkTimeCell = document.createElement('td');
  walkTimeCell.textContent = this.walkTime;
  lunchboxRow.appendChild(walkTimeCell);

  var waitTimeCell = document.createElement('td');
  waitTimeCell.textContent = this.waitTime;
  lunchboxRow.appendChild(waitTimeCell);

  var totalTimeCell = document.createElement('td');
  totalTimeCell.textContent = this.totalTime;
  lunchboxRow.appendChild(totalTimeCell);

  var priceCell = document.createElement('td');
  priceCell.textContent = this.price;
  lunchboxRow.appendChild(priceCell);

  var ratingCell = document.createElement('td');
  ratingCell.textContent = this.rating;
  lunchboxRow.appendChild(ratingCell);

  lunchboxTableBody.appendChild(lunchboxRow);


};

for (var i = 0; i <lunchbox.length; i++) {
  lunchbox[i].render();
}

// Below are the functions for sorting lunchbox array based on different clicks on the table headers.

function sortByWalkTime (event) {
  lunchbox.sort(function (a, b) {
    return a.walkTime - b.walkTime;
  });
  var lunchboxTableBody = document.getElementById('lunchbox-table-body');
  lunchboxTableBody.innerHTML = '';
  for (var i = 0; i <lunchbox.length; i++) {
    lunchbox[i].render();
  }
}

function sortByWaitTime (event) {
  lunchbox.sort(function (a, b) {
    return a.waitTime - b.waitTime;
  });
  var lunchboxTableBody = document.getElementById('lunchbox-table-body');
  lunchboxTableBody.innerHTML = '';
  for (var i = 0; i <lunchbox.length; i++) {
    lunchbox[i].render();
  }
}

function sortByTotalTime (event) {
  lunchbox.sort(function (a, b) {
    return a.totalTime - b.totalTime;
  });
  var lunchboxTableBody = document.getElementById('lunchbox-table-body');
  lunchboxTableBody.innerHTML = '';
  for (var i = 0; i <lunchbox.length; i++) {
    lunchbox[i].render();
  }
}

function sortByPrice (event) {
  lunchbox.sort(function (a, b) {
    if (a.price.length > b.price.length) {
      return 1;
    }
    else if (b.price.length > a.price.length) {
      return -1;
    }
  });
  var lunchboxTableBody = document.getElementById('lunchbox-table-body');
  lunchboxTableBody.innerHTML = '';
  for (var i = 0; i <lunchbox.length; i++) {
    lunchbox[i].render();
  }
}

function sortByRating (event) {
  lunchbox.sort(function (a, b) {
    if (a.rating > b.rating) {
      return 1;
    }
    else if (b.rating > a.rating) {
      return -1;
    }
  });

  var lunchboxTableBody = document.getElementById('lunchbox-table-body');
  lunchboxTableBody.innerHTML = '';
  for (var i = 0; i <lunchbox.length; i++) {
    lunchbox[i].render();
  }
}