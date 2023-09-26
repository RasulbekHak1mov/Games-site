const gameContainer = document.querySelector('.game-container');
const snake = document.querySelector('.snake');
const food = document.querySelector('.food');
const startButton = document.getElementById('start-button');
const rightButton = document.getElementById('right-button');
const leftButton = document.getElementById('left-button');
const upButton = document.getElementById('up-button');
const downButton = document.getElementById('down-button');
const resetButton = document.getElementById('reset-button');
const scoreDisplay = document.getElementById('score-display');

let score = 0;
let snakeX = 0;
let snakeY = 0;
let foodX = 0;
let foodY = 0;
let direction = 'right';
let gameInterval;
let snakeLength = 1;
let foodEaten = false;
function updateScore() {
    scoreDisplay.textContent = `Balllar: ${score}`;
}

function randomPosition(max) {
    return Math.floor(Math.random() * max);
}

function updateFoodPosition() {
    let newX, newY;
    do {
        newX = randomPosition(30) * 10;
        newY = randomPosition(30) * 10;
    } while (newX === snakeX && newY === snakeY);

    foodX = newX;
    foodY = newY;
    food.style.left = foodX + 'px';
    food.style.top = foodY + 'px';
}

function checkCollision() {
    const maxX = gameContainer.clientWidth - snake.clientWidth;
    const maxY = gameContainer.clientHeight - snake.clientHeight;

    if (snakeX < 0 || snakeX > maxX || snakeY < 0 || snakeY > maxY) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(gameInterval);
    alert(`O'yin tugadi! Ilon maydon chegarasidan chiqib ketdi. Siz ${score} ball yig'ingiz.`);
    resetGame();
    score = 0;
    updateScore();
}

function resetGame() {
    snakeX = 0;
    snakeY = 0;
    snake.style.left = '0px';
    snake.style.top = '0px';
    direction = 'right';
    snakeLength = 1;
    foodEaten = false;
    updateFoodPosition();

    const tails = document.querySelectorAll('.tail');
    tails.forEach(tail => tail.parentNode.removeChild(tail));

    startButton.disabled = false;
    gameInterval = null;
}
function moveSnake() {
    switch (direction) {
        case 'right':
            snakeX += 10;
            break;
        case 'left':
            snakeX -= 10;
            break;
        case 'up':
            snakeY -= 10;
            break;
        case 'down':
            snakeY += 10;
            break;
    }

    if (foodX === snakeX && foodY === snakeY) {
        foodEaten = true;
        snakeLength++;
        score += 1;
        updateScore();
        updateFoodPosition();

        // Ilonning uzunligini oshirish
        let tailLength = snakeLength - 1;
        while (tailLength > 0) {
            const newTail = document.createElement('div');
            newTail.classList.add('tail');
            gameContainer.appendChild(newTail);
            tailLength--;
        }
    }

    snake.style.left = snakeX + 'px';
    snake.style.top = snakeY + 'px';

    if (!foodEaten) {
        const tail = document.querySelector('.tail');
        if (tail) {
            tail.parentNode.removeChild(tail);
        }
    }

    const tails = document.querySelectorAll('.tail');
    if (tails.length > snakeLength) {
        tails[0].parentNode.removeChild(tails[0]);
    }

    checkCollision();
}


startButton.addEventListener('click', () => {
    if (!gameInterval) {
        startButton.disabled = true;
        gameInterval = setInterval(moveSnake, 100);
    }
});

rightButton.addEventListener('click', () => {
    if (direction !== 'left') {
        direction = 'right';
    }
});

leftButton.addEventListener('click', () => {
    if (direction !== 'right') {
        direction = 'left';
    }
});

upButton.addEventListener('click', () => {
    if (direction !== 'down') {
        direction = 'up';
    }
});

downButton.addEventListener('click', () => {
    if (direction !== 'up') {
        direction = 'down';
    }
});

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
        case 'ArrowLeft':
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 'ArrowUp':
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 'ArrowDown':
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(gameInterval);
    gameOver();
});

resetGame();
