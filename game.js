const buttonColours = ["red", "blue", "green", "yellow"]
const gamePattern = []
const userClickedPattern = []

$(document).keypress(function(e){
    console.log()
    if (e.key ==="a"){
        startGame()
    }
})

$(".btn").click((e)=> {
    userChosenColour = e.target.id
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
}
)

function nextSequence(){
    return Math.round(Math.random()*3) 
}

function startGame(){
    const randomNumber = nextSequence()

    const randomChosenColour = buttonColours[randomNumber]

    gamePattern.push(randomChosenColour)
    $(`#${randomChosenColour}`).fadeOut().fadeIn(100);

    playSound(randomChosenColour) 
}

function playSound(name) {
    let audioButton = new Audio (`./sounds/${name}.mp3`);

    audioButton.play();
}

function animatePress(currentColour) {
    $(`#${currentColour}`).addClass("pressed")
    setTimeout(() => $(`#${currentColour}`).removeClass("pressed"),100)
}