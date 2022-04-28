
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];// For storing the game pattern

var userClickedPattern = [];// For storing the user clicked pattern

var level = 0;

var started = false;

// Keydown listener for the document
$(document).keydown(function(){
  if(!started){
    started = true;
    nextSequence();
  }

});

// Click listener for each button.
$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Function for checking the answer. Every time a button is clicked, this function is called.
function checkAnswer(currentLevel) {// currentLevel is the last element in userClickedPattern
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){// check whether whole pattern has finished or not
      setTimeout(function() {
          nextSequence();
      }, 1000);// If pattern has matched completely, then after 1000ms call nextSequence
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// Function for generating the next color in sequence
function nextSequence() {
  userClickedPattern = [];// Reset user clicked pattern for the next level
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);// Push the next color in the array

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);// Animation to show which is the next color
  playSound(randomChosenColour)
}

// Implementation of animation shown when a key is pressed
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Play any sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Reset the game to start over again
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
