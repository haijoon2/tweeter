/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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

$("document").ready(() => {
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
    const tweetText = $(this).find('textarea').val();

    // Validation for the tweet text
    if (!tweetText || tweetText.length === 0) {
      alert('Tweet cannot be empty!');
      return;

    } else if (tweetText.length > 140) {
      alert('Tweet cannot be more than 140 characters!');
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
        $(this).find('textarea').val('');
        loadTweets();
      },
      error: function(error) {
        console.log('Error: ', error);
      }
    });
  });
});