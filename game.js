const buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let level = 0
let gameStart = false

$(document).keypress(function(e){
    console.log()
    if (e.key ==="a" && gameStart == false){
        gameStart = true
        setTimeout(()=>{
            nextSequence()
            levelManegment()
            watchButtonPress()
        }, 500)
    }
})

function nextNumber(){
    return Math.round(Math.random()*3) 
}

function nextSequence(){
    const randomNumber = nextNumber()
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

function watchButtonPress() {
    $(".btn").click((e)=> {
        userChosenColour = e.target.id
        userClickedPattern.push(userChosenColour)
        animatePress(userChosenColour)
        checkAnswer(userChosenColour)
    }
    )
}

function levelManegment() {
$('#level-title').html(`Level: ${level}`)
}

function checkAnswer(colorUser) {
    let status = true
    userClickedPattern.forEach((e,i)=>{
        if (e !== gamePattern[i]) {
            status = false
        }
    })
    if (userClickedPattern.length == gamePattern.length){
        if (status == true) {
            playSound(colorUser) 
            setTimeout(()=>{
                userClickedPattern = []
                level++
                levelManegment()
                nextSequence()
            }, 1000)    
        } else {
            gameOver()  
        } 
    } else {
        if (status) {
            playSound(colorUser) 
        } else {
            gameOver()  
        }
    }
}

function gameOver() {
    playSound('wrong')
    level = 0
    gamePattern = []
    userClickedPattern = []
    $('#level-title').html('You Lose.')
    $('body').css("background-color","red")
    setTimeout(()=>{
        $(".btn").off("click")
        $('body').css("background-color","#011F3F")
        $('#level-title').html('Press A Key to Start Again')
        gameStart = false
    }, 200)
}