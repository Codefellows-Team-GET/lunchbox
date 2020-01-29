'use strict';

// const Server = require('../server.js');
// const Input = require('../js/input.js');
// const Results = require('../js/results.js');


function submitInfo(){
  document.getElementById('name').addEventListener('change', function() {
    // console.log(this.value);
    localStorage.setItem('setname', this.value);
  });
}
submitInfo();




