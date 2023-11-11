$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let textValue = $(this).val();
    let currentTextLength = textValue.length;
    const remainingChars = 140 - currentTextLength;
    
    let counterElement = $(this).siblings('.button-counter').find('.counter');

    counterElement.text(remainingChars);

    if (remainingChars < 0) {
      counterElement.css('color', 'red');
    } else {
      counterElement.css('color', '');
    }

  });
});