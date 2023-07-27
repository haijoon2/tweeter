$(document).ready(function() {
  // --- our code goes here ---
  $("form").on("input", function() {
    // Use jQuery to get the value of the textarea
    const tweetText = $('.text-container').val();
    console.log("this is tweetText", tweetText);

    // Calculate the number of characters left
    const maxLength = 140;
    const charactersLeft = maxLength - tweetText.length;
    console.log("this is charactersLeft", charactersLeft);
  });
});