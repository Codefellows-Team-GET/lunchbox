'use strict';

// const Server = require('../server.js');
// const Input = require('../js/input.js');
// const Results = require('../js/results.js');

// $('#topage2').on('click', function(){
//   let username = alert(`Hello ${name}`);
  
// });


function submitInfo(){
  document.getElementById('name').addEventListener('change', function() {
    // console.log(this.value);
    localStorage.setItem('setname', this.value);
    var um = localStorage.getItem('setname')
    console.log(um)
  });
}

submitInfo();

$("topage2").on("click", submitInfo());




