'use strict';

console.log('JS linked');

$('.sort').click(function(){
  console.log('something was clicked', $(this).text())
  $.ajax({
    type: 'POST',
    url: '/sort',
    data: $(this).text(),
    dataType: 'JSON'
  });
});
