const options = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
const playerChoiceIcon = document.getElementById("player-choice-icon");
const computerChoiceIcon = document.getElementById("computer-choice-icon");
const playerScoreElement = document.getElementById("player-score");
const computerScoreElement = document.getElementById("computer-score");
const resultsMsg = document.getElementById("results-msg");
const winnerMsg = document.getElementById("winner-msg");
const optionsContainer = document.querySelector(".options-container");
const resetGameBtn = document.getElementById("reset-game-btn");
const playerChoice = document.querySelector(".player-choice");
const computerChoice = document.querySelector(".computer-choice");

let playerScore = 0;
let computerScore = 0;

function getRandomComputerChoice() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function getChoiceIcon(choice) {
  switch (choice) {
    case "Rock":
      return '<i class="fas fa-hand-rock"></i>';
    case "Paper":
      return '<i class="fas fa-hand-paper"></i>';
    case "Scissors":
      return '<i class="fas fa-hand-scissors"></i>';
    case "Lizard":
      return '<i class="fas fa-hand-lizard"></i>';
    case "Spock":
      return '<i class="fas fa-hand-spock"></i>';
    default:
      return '<i class="fas fa-question"></i>';
  }
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  }

  const winningCombinations = {
    Rock: ["Scissors", "Lizard"],
    Paper: ["Rock", "Spock"],
    Scissors: ["Paper", "Lizard"],
    Lizard: ["Paper", "Spock"],
    Spock: ["Rock", "Scissors"],
  };

  if (winningCombinations[playerChoice].includes(computerChoice)) {
    return "player";
  } else {
    return "computer";
  }
}

function getResultMessage(playerChoice, computerChoice, winner) {
  if (winner === "tie") {
    return `It's a tie! Both chose ${playerChoice}`;
  }

  const resultMessages = {
    Rock: {
      Scissors: "Rock crushes Scissors",
      Lizard: "Rock crushes Lizard",
    },
    Paper: {
      Rock: "Paper covers Rock",
      Spock: "Paper disproves Spock",
    },
    Scissors: {
      Paper: "Scissors cuts Paper",
      Lizard: "Scissors decapitates Lizard",
    },
    Lizard: {
      Paper: "Lizard eats Paper",
      Spock: "Lizard poisons Spock",
    },
    Spock: {
      Rock: "Spock vaporizes Rock",
      Scissors: "Spock smashes Scissors",
    },
  };

  if (winner === "player") {
    return `You win! ${resultMessages[playerChoice][computerChoice]}`;
  } else {
    return `Computer wins! ${resultMessages[computerChoice][playerChoice]}`;
  }
}

function updateChoiceDisplay(userChoice, computerResult) {
  playerChoiceIcon.innerHTML = getChoiceIcon(userChoice);
  computerChoiceIcon.innerHTML = getChoiceIcon(computerResult);
}

function playRound(userChoice) {
  const computerResult = getRandomComputerChoice();

  updateChoiceDisplay(userChoice, computerResult);

  const winner = determineWinner(userChoice, computerResult);
  const resultMessage = getResultMessage(userChoice, computerResult, winner);

  if (winner === "player") {
    playerScore++;
    playerChoice.classList.add("winner");
    setTimeout(() => playerChoice.classList.remove("winner"), 1000);
  } else if (winner === "computer") {
    computerScore++;
    computerChoice.classList.add("winner");
    setTimeout(() => computerChoice.classList.remove("winner"), 1000);
  }

  resultsMsg.innerText = resultMessage;
  updateScores();

  checkGameEnd();
}

function updateScores() {
  playerScoreElement.innerText = playerScore;
  computerScoreElement.innerText = computerScore;
}

function checkGameEnd() {
  if (playerScore === 5 || computerScore === 5) {
    const winner = playerScore === 5 ? "You" : "Computer";
    winnerMsg.innerText = `${winner} won the game!`;

    resetGameBtn.style.display = "block";
    optionsContainer.style.display = "none";
  }
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;

  updateScores();

  resetGameBtn.style.display = "none";
  optionsContainer.style.display = "block";

  winnerMsg.innerText = "";
  resultsMsg.innerText = "";

  playerChoiceIcon.innerHTML = '<i class="fas fa-question"></i>';
  computerChoiceIcon.innerHTML = '<i class="fas fa-question"></i>';
}

document
  .getElementById("rock-btn")
  .addEventListener("click", () => playRound("Rock"));
document
  .getElementById("paper-btn")
  .addEventListener("click", () => playRound("Paper"));
document
  .getElementById("scissors-btn")
  .addEventListener("click", () => playRound("Scissors"));
document
  .getElementById("lizard-btn")
  .addEventListener("click", () => playRound("Lizard"));
document
  .getElementById("spock-btn")
  .addEventListener("click", () => playRound("Spock"));
resetGameBtn.addEventListener("click", resetGame);
