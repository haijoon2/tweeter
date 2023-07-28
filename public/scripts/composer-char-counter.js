// Wait for the document to be ready before executing jQuery code
$(document).ready(function () {
  // Register an event handler for the input event on the textarea with class .text-container
  $(".text-container").on("input", function () {
    // Calculate the number of characters left
    const maxLength = 140;
    const tweetText = $(this).val();
    const charactersLeft = maxLength - tweetText.length;

    // Target the counter element associated with the current textarea
    const counterElement = $(this).closest("form").find(".counter");
    counterElement.text(charactersLeft);

    // Add CSS class to turn the counter red if invalid
    if (charactersLeft < 0) {
      counterElement.addClass("invalid");
    } else {
      counterElement.removeClass("invalid");
    }
  });
});