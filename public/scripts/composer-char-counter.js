$(document).ready(function() {
  $('.tweet-text').on('input', function(event) {
    updateCharCount($(this));
    
  });
  
  const updateCharCount = function($element) {

    let $textValue = $element.val();
    let $currentTextLength = $textValue.length;
    const $maxCharLength = 140;
    const $remainingChars = $maxCharLength - $currentTextLength;
    
    let $counterElement = $element.siblings('.button-counter').find('.counter');
    $counterElement.text($remainingChars);

    if ($remainingChars < 0) {
      $counterElement.css('color', 'rgb(209, 73, 10)');
      $counterElement.css('animation', 'button 1s ease-out infinite');
    } else {
      $counterElement.css('color', '');
      $counterElement.css('animation-play-state', 'paused');
    }
  };

  // listener for button to scroll to top
  $(window).scrollTop(0);

  $(window).on('scroll', function() {
  
    if ($(window).scrollTop() > 100) {
      $('.container-top').show();
    } else {
      $('.container-top').hide();
    }
  });

  $('.container-top').on('click', function() {
    $('html, body').animate({scrollTop: 0 }, 'slow', function() {
      $('.tweet-text').focus();
    });
  });
});