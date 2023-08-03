/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$("document").ready(() => {
  const prependTweet = function(tweet) {
    let tweetElement = createTweetElement(tweet);
    $(".container").prepend($('.new-tweet'), tweetElement);
  };

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      prependTweet(tweet);
    }
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
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
                    ${escape(tweet.content.text)}
                  </div>
                  <footer class="tweet-footer">
                    <div class="tweet-footer-date">
                      ${timeago.format(Number(tweet.created_at))}
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

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        renderTweets(response);
      },
      error: function(error) {
        console.log('Error: ', error);
      }
    });
  };

  loadTweets();

  // Event listner for the tweet form submission
  $('.tweet-text-form').on('submit', function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const tweetText = $(this).find('textarea');
    const counter = $(this).find('.counter');
    
    const errorEmpty = $('.error-empty');
    const errorLimit = $('.error-limit');

    errorEmpty.hide();
    errorLimit.hide();
    // Validation for the tweet text
    if (!tweetText.val() || tweetText.val().length === 0) {
      errorEmpty.slideDown();
      return;
    } else if (tweetText.val().length > 140) {
      errorLimit.slideDown();
      return;
    }
    

    // AJAX request to post a new tweet
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function(response) {
        console.log('Success: ', response);
        // Clear the form after successful submission
        tweetText.val('');
        counter.text(140);
        loadTweets();
      },
      error: function(error) {
        console.log('Error: ', error);
      }
    });
  });
});