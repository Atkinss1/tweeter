/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

const unixTimeToTimeAgo = function(unixTime) {
  const currentTime = new Date();
  const timeStamp = new Date(unixTime * 1000);
  const timeDifference = currentTime - timeStamp;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? `${days} day ago` : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
  } else if (seconds > 0) {
    return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
  }
};


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
          ${unixTimeToTimeAgo(tweet.created_at)}
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

});

