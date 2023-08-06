var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
// we create a function to show the user the sequence that compiler generated and show flash and apply sound 
// as well and create an array that contains new sequnce colors
function nextsequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  // create flash
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  // create sound
  makesound(randomChosenColour);
}
// add event listener and see which button user cilck, based upon that we get his id and here also we 
// create an empty array that contains user clicked color

$(".btn").click(
  function handler() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    makesound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
)
// we will create a function to make sound either compiler shows the sequence or the user click the button
function makesound(name) {

  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
// we will create a function to animate the button when the user press the button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");

  }, 100);
}
// if any of key detected the game will start and we call the next sequence function
$(document).keydown(function () {
  if (!started) {
    // $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});
// create a function to check the result
function checkAnswer(currentLevel) {

  // an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    // If the user got the most recent answer right , then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {

      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextsequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("h1").html("<h2><strong>Game Over!</strong> press any key to restart! </h2>");
    setTimeout(function () { $("body").removeClass("game-over") }
      , 200);
      startover ();
  }

}
function startover (){
  level = 0;
  gamePattern = [];
  started = false;

}