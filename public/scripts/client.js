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
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Lobster",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@lobsterprince" },
    "content": {
      "text": "I am a lobster"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    let tweetElement = createTweetElement(tweet);
    $(".container").append(tweetElement);
  }
};

const createTweetElement = function(tweet) {
  let $tweet = `<article class="tweet">
                  <header class="tweet-header">
                    <div class="tweet-header-user">
                      <img src="${tweet.user.avatars}" alt="user avatar">
                      ${tweet.user.name}
                    </div>
                    <aside class="tweet-header-tag">
                      ${tweet.user.handle}
                    </aside>
                  </header>
                  <div class="tweet-body">
                    ${tweet.content.text}
                  </div>
                  <footer class="tweet-footer">
                    <div class="tweet-footer-date">
                      ${tweet.created_at}
                    </div>
                    <aside class="tweet-footer-icons">
                      <i class="tweet-footer-icon fa-solid fa-flag fa-xs"></i>
                      <i class="tweet-footer-icon fa-solid fa-repeat fa-xs"></i>
                      <i class="tweet-footer-icon fa-solid fa-heart fa-xs"></i>
                    </aside>
                  </footer>
                </article>`;
  return $tweet;
};

$("document").ready(() => {
  renderTweets(data);
});