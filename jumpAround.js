const character = document.getElementById('character');
const obstacle = document.querySelector('.obstacle');
const scoreDisplay = document.getElementById('score');
const gameOverMessage = document.getElementById('game-over');

let isJumping = false;
let gravity = 2;
let characterBottom = 0;
let score = 0;
let gameIsOver = false;

document.addEventListener('keydown', jump);

function jump(event) {
  if (event.code === 'Space' && !isJumping && !gameIsOver) {
    isJumping = true;
    jumpUp();
  }
}

function jumpUp() {
  let jumpHeight = 0;
  const jumpInterval = setInterval(() => {
    if (jumpHeight < 100) {
      character.style.bottom = characterBottom + jumpHeight + 'px';
      jumpHeight += 5;
    } else {
      clearInterval(jumpInterval);
      jumpDown();
    }
  }, 20);
}

function jumpDown() {
  let jumpHeight = 100;
  const jumpInterval = setInterval(() => {
    if (jumpHeight > 0) {
      character.style.bottom = characterBottom + jumpHeight + 'px';
      jumpHeight -= 5;
    } else {
      clearInterval(jumpInterval);
      isJumping = false;
    }
  }, 20);
}

function moveObstacle() {
  let obstaclePosition = 1000;

  function animate() {
    obstaclePosition -= 5;

    if (obstaclePosition < -30) {
      obstaclePosition = 1000;
      scoreDisplay.textContent = 'Score: ' + score;
    }

    obstacle.style.left = obstaclePosition + 'px';

    if (
      obstaclePosition < 50 &&
      obstaclePosition > 0 &&
      characterBottom < 50
    ) {
      // Collision detected
      endGame();
    }

    if (obstaclePosition < 50 && obstaclePosition > 0 && !isJumping) {
      // Jump successful
      score++;
    }

    if (!gameIsOver) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

function endGame() {
  gameIsOver = true;
  gameOverMessage.style.display = 'block';
}

function restartGame() {
  gameOverMessage.style.display = 'none';
  gameIsOver = false;
  resetGame();
  moveObstacle();
}

function resetGame() {
  score = 0;
  scoreDisplay.textContent = 'Score: 0';
  characterBottom = 0;
  character.style.bottom = '0';
}

moveObstacle();