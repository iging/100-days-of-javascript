// Get references to the HTML elements used in the game
const board = document.getElementById("game-board"); // The game board where the snake and food will be drawn
const instructionText = document.getElementById("instruction-text"); // Instructions for the player
const logo = document.getElementById("logo"); // Game logo
const score = document.getElementById("score"); // Current score display
const highScoreText = document.getElementById("high-score"); // High score display

// Game configuration variables
const gridSize = 20; // Size of the grid
let snake = [{ x: 10, y: 10 }]; // Initial position of the snake
let food = generateFood(); // Generate initial food position
let highScore = 0; // Variable to track the high score
let direction = "right"; // Initial direction of the snake
let gameInterval; // Interval for the game loop
let gameSpeedDelay = 200; // Delay for game speed
let gameStarted = false; // Flag to check if the game has started

// Function to draw the game elements on the board
function draw() {
  board.innerHTML = ""; // Clear the board
  drawSnake(); // Draw the snake
  drawFood(); // Draw the food
  updateScore(); // Update the score display
}

// Function to draw the snake on the board
function drawSnake() {
  snake.forEach((segment) => {
    // Iterate through each segment of the snake
    const snakeElement = createGameElement("div", "snake"); // Create a new div for the snake segment
    setPosition(snakeElement, segment); // Set the position of the snake segment
    board.appendChild(snakeElement); // Add the snake segment to the board
  });
}

// Function to create a game element (div) with a specified class
function createGameElement(tag, className) {
  const element = document.createElement(tag); // Create a new element
  element.className = className; // Assign the class name
  return element; // Return the created element
}

// Function to set the position of an element based on grid coordinates
function setPosition(element, position) {
  element.style.gridColumn = position.x; // Set the column position
  element.style.gridRow = position.y; // Set the row position
}

// Function to draw the food on the board
function drawFood() {
  if (gameStarted) {
    // Only draw food if the game has started
    const foodElement = createGameElement("div", "food"); // Create a new div for the food
    setPosition(foodElement, food); // Set the position of the food
    board.appendChild(foodElement); // Add the food to the board
  }
}

// Function to generate a new food position randomly within the grid
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1; // Random x position
  const y = Math.floor(Math.random() * gridSize) + 1; // Random y position
  return { x, y }; // Return the food position as an object
}

// Function to move the snake in the current direction
function move() {
  const head = { ...snake[0] }; // Create a copy of the snake's head
  switch (
    direction // Update head position based on direction
  ) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  // Wrap the snake around the grid if it goes out of bounds
  if (head.x < 1) head.x = gridSize; // Wrap left
  if (head.x > gridSize) head.x = 1; // Wrap right
  if (head.y < 1) head.y = gridSize; // Wrap up
  if (head.y > gridSize) head.y = 1; // Wrap down

  snake.unshift(head); // Add the new head to the snake

  // Check if the snake has eaten the food
  if (head.x === food.x && head.y === food.y) {
    food = generateFood(); // Generate new food
    increaseSpeed(); // Increase the speed of the game
    clearInterval(gameInterval); // Clear the current game interval
    gameInterval = setInterval(() => {
      // Set a new game interval
      move(); // Move the snake
      checkCollision(); // Check for collisions
      draw(); // Redraw the game elements
    }, gameSpeedDelay);
  } else {
    snake.pop(); // Remove the last segment of the snake if no food is eaten
  }
}

// Function to start the game
function startGame() {
  gameStarted = true; // Set the game started flag
  instructionText.style.display = "none"; // Hide instructions
  logo.style.display = "none"; // Hide logo
  gameInterval = setInterval(() => {
    // Start the game loop
    move(); // Move the snake
    checkCollision(); // Check for collisions
    draw(); // Redraw the game elements
  }, gameSpeedDelay);
}

// Function to handle key presses for controlling the game
function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === "Space") || // Start game on space if not started
    (!gameStarted && event.key === " ")
  ) {
    startGame(); // Start the game
  } else {
    switch (
      event.key // Change direction based on arrow key pressed
    ) {
      case "ArrowUp":
        direction = "up";
        break;
      case "ArrowDown":
        direction = "down";
        break;
      case "ArrowLeft":
        direction = "left";
        break;
      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}

// Add event listener for keydown events
document.addEventListener("keydown", handleKeyPress);

// Function to increase the speed of the game as the snake grows
function increaseSpeed() {
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5; // Decrease speed
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3; // Decrease speed
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2; // Decrease speed
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1; // Decrease speed
  }
}

// Function to check for collisions with the snake itself
function checkCollision() {
  const head = snake[0]; // Get the head of the snake

  for (let i = 1; i < snake.length; i++) {
    // Check each segment of the snake
    if (head.x === snake[i].x && head.y === snake[i].y) {
      // If head collides with any segment
      resetGame(); // Reset the game
    }
  }
}

// Function to reset the game state
function resetGame() {
  updateHighScore(); // Update the high score if necessary
  stopGame(); // Stop the current game
  snake = [{ x: 10, y: 10 }]; // Reset the snake position
  food = generateFood(); // Generate new food
  direction = "right"; // Reset direction
  gameSpeedDelay = 200; // Reset game speed
  updateScore(); // Update the score display
}

// Function to update the score display
function updateScore() {
  const currentScore = snake.length - 1; // Calculate current score based on snake length
  score.textContent = currentScore.toString().padStart(3, "0"); // Display score, padded to 3 digits
}

// Function to stop the game
function stopGame() {
  clearInterval(gameInterval); // Clear the game interval
  gameStarted = false; // Set game started flag to false
  instructionText.style.display = "block"; // Show instructions
  logo.style.display = "block"; // Show logo
}

// Function to update the high score if the current score exceeds it
function updateHighScore() {
  const currentScore = snake.length - 1; // Calculate current score
  if (currentScore > highScore) {
    // If current score is higher than high score
    highScore = currentScore; // Update high score
    highScoreText.textContent = highScore.toString().padStart(3, "0"); // Display new high score
  }
  highScoreText.style.display = "block"; // Ensure high score display is visible
}
