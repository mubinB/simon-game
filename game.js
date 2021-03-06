//alert("JS Added")

var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = []; 
var level = 0;
var started = false;

$(document).keypress(function(event) {
    if(!started) {
        $('#level-title').text("Level " + level);
        $('#rules').hide();
        nextSequence();
        started = true;
    }
})

// User Selected Buttons
$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log("userClickedPattern" + userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    userClickedPattern = [];
    level++; 
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
          $("body").removeClass("game-over");
         }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name) {
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}
