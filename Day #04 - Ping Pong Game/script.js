// Get DOM elements for game components
const startText = document.getElementById("startText");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");
const player1ScoreElement = document.getElementById("player1Score");
const player2ScoreElement = document.getElementById("player2Score");
const lossSound = document.getElementById("lossSound");
const wallSound = document.getElementById("wallSound");
const paddleSound = document.getElementById("paddleSound");

// Game state variables
let gameRunning = false; // Indicates if the game is currently running
let keysPressed = {}; // Tracks which keys are currently pressed
let paddle1Speed = 0; // Speed of player 1's paddle
let paddle1Y = 150; // Y position of player 1's paddle
let paddle2Speed = 0; // Speed of player 2's paddle
let paddle2Y = 150; // Y position of player 2's paddle
let ballX = 290; // X position of the ball
let ballSpeedX = 2; // Speed of the ball in the X direction
let ballY = 190; // Y position of the ball
let ballSpeedY = 2; // Speed of the ball in the Y direction
let player2Score = 0; // Player 2's score
let player1Score = 0; // Player 1's score

// Constants for paddle movement and game dimensions
const paddleAcceleration = 1; // Acceleration of the paddles
const maxPaddleSpeed = 5; // Maximum speed of the paddles
const paddleDeceleration = 1; // Deceleration of the paddles
const gameHeight = 400; // Height of the game area
const gameWidth = 600; // Width of the game area

// Event listeners for keyboard input
document.addEventListener("keydown", startGame);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// Function to start the game
function startGame() {
  gameRunning = true; // Set game state to running
  startText.style.display = "none"; // Hide the start text
  document.removeEventListener("keydown", startGame); // Remove start game listener
  gameLoop(); // Begin the game loop
}

// Main game loop function
function gameLoop() {
  if (gameRunning) {
    updatePaddle1(); // Update player 1's paddle position
    updatePaddle2(); // Update player 2's paddle position
    moveBall(); // Move the ball
    setTimeout(gameLoop, 8); // Continue the loop every 8 milliseconds
  }
}

// Handle key press down events
function handleKeyDown(event) {
  keysPressed[event.key] = true; // Mark the key as pressed
}

// Handle key release events
function handleKeyUp(event) {
  keysPressed[event.key] = false; // Mark the key as released
}

// Update player 1's paddle position based on key presses
function updatePaddle1() {
  // Adjust paddle speed based on key presses
  if (keysPressed["w"]) {
    paddle1Speed = Math.max(paddle1Speed - paddleAcceleration, -maxPaddleSpeed);
  } else if (keysPressed["s"]) {
    paddle1Speed = Math.min(paddle1Speed + paddleAcceleration, maxPaddleSpeed);
  } else {
    // Gradually decelerate the paddle when no keys are pressed
    if (paddle1Speed > 0) {
      paddle1Speed = Math.max(paddle1Speed - paddleDeceleration, 0);
    } else if (paddle1Speed < 0) {
      paddle1Speed = Math.min(paddle1Speed + paddleDeceleration, 0);
    }
  }

  // Update paddle position and enforce boundaries
  paddle1Y += paddle1Speed;
  if (paddle1Y < 0) {
    paddle1Y = 0; // Prevent paddle from going above the game area
  }
  if (paddle1Y > gameHeight - paddle1.clientHeight) {
    paddle1Y = gameHeight - paddle1.clientHeight; // Prevent paddle from going below the game area
  }
  paddle1.style.top = paddle1Y + "px"; // Update paddle's visual position
}

// Update player 2's paddle position based on key presses
function updatePaddle2() {
  // Adjust paddle speed based on key presses
  if (keysPressed["ArrowUp"]) {
    paddle2Speed = Math.max(paddle2Speed - paddleAcceleration, -maxPaddleSpeed);
  } else if (keysPressed["ArrowDown"]) {
    paddle2Speed = Math.min(paddle2Speed + paddleAcceleration, maxPaddleSpeed);
  } else {
    // Gradually decelerate the paddle when no keys are pressed
    if (paddle2Speed > 0) {
      paddle2Speed = Math.max(paddle2Speed - paddleDeceleration, 0);
    } else if (paddle2Speed < 0) {
      paddle2Speed = Math.min(paddle2Speed + paddleDeceleration, 0);
    }
  }

  // Update paddle position and enforce boundaries
  paddle2Y += paddle2Speed;
  if (paddle2Y < 0) {
    paddle2Y = 0; // Prevent paddle from going above the game area
  }
  if (paddle2Y > gameHeight - paddle2.clientHeight) {
    paddle2Y = gameHeight - paddle2.clientHeight; // Prevent paddle from going below the game area
  }
  paddle2.style.top = paddle2Y + "px"; // Update paddle's visual position
}

// Move the ball and handle collisions
function moveBall() {
  ballX += ballSpeedX; // Update ball's X position
  ballY += ballSpeedY; // Update ball's Y position

  // Check for collision with top and bottom walls
  if (ballY >= gameHeight - ball.clientHeight || ballY <= 0) {
    ballSpeedY = -ballSpeedY; // Reverse ball's Y direction
    playSound(wallSound); // Play wall sound
  }

  // Check for collision with player 1's paddle
  if (
    ballX <= paddle1.clientWidth &&
    ballY >= paddle1Y &&
    ballY <= paddle1Y + paddle1.clientHeight
  ) {
    ballX = paddle1.clientWidth; // Position ball at the edge of the paddle
    ballSpeedX = -ballSpeedX; // Reverse ball's X direction
    playSound(paddleSound); // Play paddle sound
  }

  // Check for collision with player 2's paddle
  if (
    ballX >= gameWidth - paddle2.clientWidth - ball.clientWidth &&
    ballY >= paddle2Y &&
    ballY <= paddle2Y + paddle2.clientHeight
  ) {
    ballX = gameWidth - paddle2.clientWidth - ball.clientWidth; // Position ball at the edge of the paddle
    ballSpeedX = -ballSpeedX; // Reverse ball's X direction
    playSound(paddleSound); // Play paddle sound
  }

  // Check for scoring conditions
  if (ballX <= 0) {
    player2Score++; // Increment player 2's score
    playSound(lossSound); // Play loss sound
    updateScoreboard(); // Update the scoreboard
    resetBall(); // Reset the ball position
    pauseGame(); // Pause the game
  } else if (ballX >= gameWidth - ball.clientWidth) {
    player1Score++; // Increment player 1's score
    playSound(lossSound); // Play loss sound
    updateScoreboard(); // Update the scoreboard
    resetBall(); // Reset the ball position
    pauseGame(); // Pause the game
  }

  // Update ball's visual position
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";
}

// Update the scoreboard display
function updateScoreboard() {
  player1ScoreElement.textContent = player1Score; // Update player 1's score
  player2ScoreElement.textContent = player2Score; // Update player 2's score
}

// Reset the ball to the center of the game area
function resetBall() {
  ballX = gameWidth / 2 - ball.clientWidth / 2; // Center the ball horizontally
  ballY = gameHeight / 2 - ball.clientHeight / 2; // Center the ball vertically
  ballSpeedX = Math.random() > 0.5 ? 2 : -2; // Randomize initial X speed
  ballSpeedY = Math.random() > 0.5 ? 2 : -2; // Randomize initial Y speed
}

// Pause the game and allow it to be restarted
function pauseGame() {
  gameRunning = false; // Set game state to not running
  document.addEventListener("keydown", startGame); // Allow game to be restarted
}

// Play a sound effect
function playSound(sound) {
  sound.currentTime = 0; // Reset sound to start
  sound.play(); // Play the sound
}
