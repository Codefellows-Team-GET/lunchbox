'use strict';

console.log('JS linked');

$(".sort").click(function(){
  console.log('something was clicked', $(this).attr('id'));
  $.ajax({
    type: "GET",
    url: `/sort/${$(this).attr('id')}`,
    // data: $(this).attr('id'),
    // dataType: "JSON"
  });
});
