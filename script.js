let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let time = 30;
let timer = null;
let gameRunning = false;
let boxSize = 50;

const clickSound = new Audio("sounds/click.mp3");
const gameOverSound = new Audio("sounds/gameover.mp3");

const box = document.getElementById("box");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
highScoreText.innerText = highScore;
const timeText = document.getElementById("time");

const startScreen = document.getElementById("startScreen");

const gameOverScreen = document.getElementById("gameOverScreen");

const finalScore = document.getElementById("finalScore");

function startGame() {

  startScreen.classList.add("hidden");

  gameOverScreen.classList.add("hidden");
    clearInterval(timer);

    score = 0;
    time = 30;
    gameRunning = true;

    scoreText.innerText = score;
    timeText.innerText = time;

    box.style.display = "block";
    boxSize = 50;
    box.style.width = boxSize + "px";
    box.style.height = boxSize + "px";
    moveBox();

    timer = setInterval(function () {
        time--;
        timeText.innerText = time;

        if (time <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {

    clearInterval(timer);

    timer = null;

    gameRunning = false;

    box.style.display = "none";

    gameOverSound.play();

    finalScore.innerText = score;

    gameOverScreen.classList.remove("hidden");

    if (score > highScore) {

        highScore = score;

        localStorage.setItem("highScore", highScore);

        highScoreText.innerText = highScore;
    }
}

box.onclick = function () {

    if (gameRunning === false) {
        return;
    }

    clickSound.currentTime = 0;
    clickSound.play();

    box.style.transform = "scale(0.8)";

    setTimeout(() => {
    box.style.transform = "scale(1)";
    } , 100);

    score++;
    scoreText.innerText = score;

    // every 5 score make harder
    if (score % 5 === 0) {

        if (boxSize > 20) {
            boxSize -= 5;

            box.style.width = boxSize + "px";
            box.style.height = boxSize + "px";
        }
    }

    moveBox();
};

function moveBox() {
    const gameArea = document.getElementById("gameArea");

    const maxX = gameArea.clientWidth - box.clientWidth;
    const maxY = gameArea.clientHeight - box.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    box.style.left = randomX + "px";
    box.style.top = randomY + "px";
    box.style.background = randomColor();
}

function randomColor() {

    const letters = "0123456789ABCDEF";

    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}