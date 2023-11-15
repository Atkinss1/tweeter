/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1699934322
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1699934400
  }
];
  
$(document).ready(function() {
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('.main-tweet-container').append(createTweetElement(tweet));
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
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>
        </footer>
      </article>
    </section>`);
  
    return $tweet;
  };
  renderTweets(data);

  $('.text-box').on('submit', (event) => {
    event.preventDefault();
    const $formData = $('.text-box').serialize();
   
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: $formData,
      success: function(res) {
        console.log(`Success: ${res}`);
      },
      error: function (err) {
        console.log(`Error: ${err}`);
      }
    });
  });

  const loadTweets = function(tweetData) {
   
    $.ajax({
      url: '/tweets',
      method: 'GET',
      type: 'json',
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

