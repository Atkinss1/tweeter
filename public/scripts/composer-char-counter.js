$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let $textValue = $(this).val();
    let $currentTextLength = $textValue.length;
    const remainingChars = 140 - $currentTextLength;
    
    let $counterElement = $(this).siblings('.button-counter').find('.counter');

    $counterElement.text(remainingChars);

    if (remainingChars < 0) {
      $counterElement.css('color', 'rgb(209, 73, 10)');
      $counterElement.css('animation', 'button 1s ease-out infinite');
    } else {
      $counterElement.css('color', '');
      $counterElement.css('animation-play-state', 'paused');
    }

  });
});