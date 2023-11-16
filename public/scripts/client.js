/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('.main-tweet-container').prepend(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <section class="tweet-container">
      <article class="tweet-article">
        <header class="new-tweet-header">
          <div class="icon-username">
          <img class="new-tweet-avatar" src="${tweet.user.avatars}"></img>
          ${tweet.user.name}</div>
          <div>${tweet.user.handle}</div>
        </header>
        <div class="tweet">${tweet.content.text}</div>
        <div class="bottom-border"></div>
        <footer class="new-tweet-footer">
          <div class="tweet-date">
          ${timeago.format(tweet.created_at)}
            <div class="tweet-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart" id="heart-icon"></i>
            </div>
          </div>
        </footer>
      </article>
    </section>`);
  
    return $tweet;
  };

  $('.text-box').on('submit', (event) => {
    event.preventDefault();
    const $formData = $('.text-box').serialize();
    const maxCharLength = 140;
    const $textValue = $('textarea').val();
    const $textLength = $textValue.length;

    if ($textLength === 0) {
      return $('#display-empty-message').fadeIn().delay(3000).fadeOut();
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

});

