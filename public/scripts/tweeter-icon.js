$(document).ready(function() {
  $('.fa-heart').on('click', function() {

    if ($(this).css('color') === 'rgb(56, 64, 71)') {
      $(this).css('color', '');
    } else {
      $(this).css('color', 'rgb(56, 64, 71)');
    }
  });
});
  
  