/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {

  // Displays tweets from database given in parameter in reverse order

  const renderTweets = function(tweets) {
    $('.main-tweet-container').empty();
    for (const tweet of tweets) {
      $('.main-tweet-container').prepend(createTweetElement(tweet));
    }
  };

  /**
   * Takes in string from tweet content and creates a text node so the browser reads the string as plain text and escapes interpreting HTML
   *
   * @param {} str
   * @returns
   */
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Creates new tweet template

  const createTweetElement = function(tweet) {
    const safeHTML = escape(tweet.content.text);
    
    const $tweet = $(`
    <section class="tweet-container">
      <article class="tweet-article">
        <header class="new-tweet-header">
          <div class="icon-username">
          <img class="new-tweet-avatar" src="${tweet.user.avatars}"></img>
          ${tweet.user.name}</div>
          <div>${tweet.user.handle}</div>
        </header>
        <div class="tweet">${safeHTML}</div>
        <div class="bottom-border"></div>
        <footer class="new-tweet-footer">
          <div class="tweet-date">
          ${timeago.format(tweet.created_at)}
            <div class="tweet-icons">
              <div><i class="fa-solid fa-flag"></i></div>
              <div><i class="fa-solid fa-retweet"></i></div>
              <div><i class="fa-solid fa-heart"></i></div>
            </div>
          </div>
        </footer>
      </article>
    </section>`);
  
    return $tweet;
  };

  // event handler when tweet is submitted

  $('.text-box').on('submit', (event) => {
    event.preventDefault();
    const $formData = $('.text-box').serialize();
    const maxCharLength = 140;
    const $textValue = $('textarea').val();
    const $textLength = $textValue.length;

    if ($textLength === 0) {
      return $('#display-empty-message').fadeIn('slow').delay(3000).fadeOut();
    }

    if ($textLength > maxCharLength) {
      return $('#display-maximum-message').fadeIn().delay(3000).fadeOut();
    }
   
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $formData,
      success: function(res) {
        $('.tweet-text').val('');
        console.log(`Success: ${res}`);
        charCountReset();
        loadTweets();
      },
      error: function(err) {
        console.log(`Error: ${err}`);
      }
    });
  });

  const loadTweets = function() {
   
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(recievedTweets) {
        console.log('Successfully recieved tweets from the server');
        renderTweets(recievedTweets);
      },
      error: function(err) {
        console.log(`Error fetching tweets: ${err}`);
      }
    });
  };

  loadTweets();


  // hide our tweet form and wait for a click event

  const $newTweet = document.querySelector('.slide-out-tweet');
  const $tweetContainer = document.querySelector('.new-tweet');
  $($tweetContainer).hide();

  const toggleTextBox = function(element) {
    $(element).slideToggle().find($('textarea')).focus();
  }
  
  $($newTweet).on('click', function() {
    toggleTextBox($tweetContainer);
  });

  const charCountReset = function() {
    const $maxCharLength = 140;
    let $counterElement = $('.tweet-text').siblings('.button-counter').find('.counter');
    $counterElement.text($maxCharLength);
  };

});

