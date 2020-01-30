'use strict';


// $('#topage2').on('click', function(){
//   alert('The paragraph was clicked.');
//   // ahref='input';
// });



function submitInfo(){
  document.getElementById('name').addEventListener('change', function() {
    // console.log(this.value);
    localStorage.setItem('setname', this.value);
  });
}
submitInfo();
function admin(){
  document.getElementById('pw').addEventListener('change', function() {
    console.log(this.value);
    if(this.value === 'cait'){
      window.location.href = 'https://github.com/Codefellows-Team-GET';
    }

  });
}
admin();




