/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <section class="tweet-container">
      <article class="tweet-article">
        <header class="new-tweet-header">
          <div class="icon-username"><i class="new-tweet-avatar" src="${tweet.user.avatars}"></i>${tweet.user.name}</div>
          <div>${tweet.user.handle}</div>
        </header>
        
        <div class="tweet">${tweet.content.text}</div>
        <div class="bottom-border"></div>
        
        <footer class="new-tweet-footer">
      
        <div class="tweet-date">
        10 days ago
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
  const $tweet = createTweetElement(tweetData);
  $('.main-tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});
// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

